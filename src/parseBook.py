#! /usr/bin/python2.7

import os
import os.path
import re
import subprocess

latexEngine = "xelatex"

# Output path
outputPath = "."

if not os.path.exists(outputPath):
    os.makedirs(outputPath)
pdfBookPath = os.path.join(outputPath, "book.pdf")
texBookPath = os.path.join(outputPath, "book.tex")

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
                            " -s 0.5 -o " + shaderImage
            print shaderCommand
            returnCode = subprocess.call(shaderCommand, shell=True)
            rta += "![](" + shaderImage + ")\n"
        elif line.find('.gif') >= 0:
            gifPath = re.sub(r'\!\[.*\]\((.*\.gif)\)', r'\1', line.rstrip())
            gifName, gifExt = os.path.splitext(gifPath)
            pngImage = gifName + ".png"
            convertCommand = "convert " + gifPath + " " + pngImage
            print convertCommand
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
generalOptions = ["-N", "--smart", "--no-tex-ligatures", "--toc", "--standalone",
                  "--preserve-tabs", "-V documentclass=scrbook", "-V papersize=a4", "-V links-as-note", "-S"]
latexOptions = ["--latex-engine=" + latexEngine]
outputOptions = ["--output={0}".format(pdfBookPath)]
pandocCommand = ["pandoc"] + outputOptions + \
    inputOptions + generalOptions + latexOptions

# Print out of the chapters being built and the flags being used
print "Generating {0} from:".format(pdfBookPath)
for chapter in inputOptions:
    print "\t{0}".format(chapter)
print "Using the following flags:"
for flag in generalOptions + latexOptions:
    print "\t{0}".format(flag)

# For debugging purposes, it's a good idea to generate the .tex.  Errors
# printed out through pandoc aren't as useful as those printed
# directly from trying to build a PDF in TeXworks.
texOutputOptions = ["--output={0}".format(texBookPath)]
texPandocCommand = ["pandoc"] + texOutputOptions + \
    inputOptions + generalOptions + latexOptions
returnCode = subprocess.call(texPandocCommand)
if returnCode == 0:
    print "Successful building of {0}".format(texBookPath)
else:
    print "Error in building of {0}".format(texBookPath)

# Call pandoc
returnCode = subprocess.call(pandocCommand)
if returnCode == 0:
    print "Successful building of {0}".format(pdfBookPath)
else:
    print "Error in building of {0}".format(pdfBookPath)
