import os
import os.path
import re
import subprocess
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-f", "--format", action='append', choices=['tex', 'pdf', 'epub'], type=str.lower, required=True)
parser.add_argument("--skip-image-generation", help="skip image generation", action="store_true")
args = parser.parse_args()

latexEngine = "xelatex"

# Output path
outputPath = "."

if not os.path.exists(outputPath):
    os.makedirs(outputPath)

chapters = []

def injectShaderBlocks(_folder, _text):
    rta = ""
    lines = _text.split('\n')
    for line in lines:
        if line.find('<div class=\"codeAndCanvas\"') >= 0:
            shaderTextureResults = re.findall(
                r'<div class=\"codeAndCanvas\" data=\".*\" data-imgs=\"(.*)\"></div>', line.rstrip())
            shaderFile = re.sub(
                r'<div class=\"codeAndCanvas\" data=\"(.*?)\"(>| .+>)</div>', r'\1', line.rstrip())

            shaderName, shaderExt = os.path.splitext(shaderFile)

            shaderPath = folder + "/" + shaderFile
            if shaderTextureResults:
                shaderTexturePaths = map(
                    lambda f: folder + "/" + f, shaderTextureResults[0].split(","))
            else:
                shaderTexturePaths = []

            shaderString = open(shaderPath, 'r').read()
            rta += '```glsl\n' + shaderString.rstrip('\n') + '\n```\n'
            shaderImage = folder + "/tmp-" + shaderName + ".png"
            shaderCommand = "glslViewer " + shaderPath + " " + \
                            " ".join(shaderTexturePaths) + \
                            " --headless -e wait,0.5 -E screenshot," + shaderImage
            print(shaderCommand)
            if not args.skip_image_generation:
                returnCode = subprocess.call(shaderCommand, shell=True)
            rta += "![](" + shaderImage + ")\n"
        elif line.find('.gif') >= 0:
            gifPath = re.sub(r'\!\[.*\]\((.*\.gif)\)', r'\1', line.rstrip())
            gifName, gifExt = os.path.splitext(gifPath)
            pngImage = gifName + ".png"
            convertCommand = "convert " + gifPath + " " + pngImage
            print(convertCommand)
            if not args.skip_image_generation:
                returnCode = subprocess.call(convertCommand, shell=True)
            rta += re.sub(r'\!\[(.*)\]\((.*)\.gif\)',
                          r'![\1](\2-0.png)', line) + '\n'
        else:
            rta += line + '\n'
    return rta


d = '.'
folders = [os.path.join(d, o) for o in os.listdir(
    d) if os.path.isdir(os.path.join(d, o))]
folders.sort()
for folder in folders:
    if os.path.isfile(folder + '/README.md'):
        with open(folder + '/README.md', "r") as originalChapter:
            fileString = originalChapter.read()

            # Correct path for images
            imgPattern = r'(\!\[.*?\]\()(.*)'
            subPattern = r'\1' + folder + r'/\2'
            modifiedChapterString = re.sub(imgPattern, subPattern, fileString)
            modifiedChapterString = injectShaderBlocks(
                folder, modifiedChapterString)
            modifiedChapterPath = folder + '/tmp.md'
            with open(modifiedChapterPath, "w") as modifiedChapter:
                modifiedChapter.write(modifiedChapterString)
        chapters.append(modifiedChapterPath)


# Set up the appropriate options for the pandoc command
inputOptions = chapters
generalOptions = ["-N", "--toc", "--standalone", 
                  "--preserve-tabs", "-V documentclass=scrbook", 
                  "-V papersize=a4", "-V links-as-note"]
latexOptions = ["--pdf-engine=" + latexEngine]

for outputFormat in args.format:
    bookPath = os.path.join(outputPath, "book.{0}".format(outputFormat))
    formatOutputOptions = []

    if outputFormat == 'epub':
        formatOutputOptions = ["--epub-metadata=epub/metadata.xml", 
                                "--epub-cover-image=epub/cover.png"]

    outputOptions = ["--output={0}".format(bookPath)] + formatOutputOptions
    pandocCommand = ["pandoc"] + inputOptions + outputOptions \
        + generalOptions + latexOptions

    # print(out of the chapters being built and the flags being used
    print("Generating {0} from:".format(bookPath))
    for chapter in inputOptions:
        print("\t{0}".format(chapter))
    print("Using the following flags:")
    for flag in outputOptions + generalOptions + latexOptions:
        print("\t{0}".format(flag))

    returnCode = subprocess.call(pandocCommand)
    if returnCode == 0:
        print("Successful building of {0}".format(bookPath))
    else:
        print("Error in building of {0}".format(bookPath))
