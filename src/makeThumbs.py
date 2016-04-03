import os
import os.path
import re
import subprocess

def injectShaderBlocks( _folder, _text ):
    rta = ""
    lines = _text.split('\n');
    for line in lines:
        if line.find('<div class=\"codeAndCanvas\"') >= 0:
            shaderTextureResults = re.findall(r'<div class=\"codeAndCanvas\" data=\".*\" data-imgs=\"(.*)\"></div>', line.rstrip())
            shaderFile = re.sub(r'<div class=\"codeAndCanvas\" data=\"(.*?)\"(>| .+>)</div>', r'\1', line.rstrip())

            shaderName,shaderExt = os.path.splitext(shaderFile)

            shaderPath = folder+"/"+shaderFile;
            if shaderTextureResults:
                shaderTexturePaths = map (lambda f: folder+"/"+f, shaderTextureResults[0].split(","))
            else:
                shaderTexturePaths = []

            shaderString = open(shaderPath, 'r').read()
            shaderImage = folder+"/"+shaderName+".png"
            shaderCommand = "glslViewer " + shaderPath + " " + \
                            " ".join(shaderTexturePaths) + \
                            " -s 0.5 -o " + shaderImage
            print shaderCommand
            returnCode = subprocess.call(shaderCommand, shell=True)

d='.'
folders = [os.path.join(d,o) for o in os.listdir(d) if os.path.isdir(os.path.join(d,o))];
folders.sort()
for folder in folders:
    if os.path.isfile(folder+'/README.md'):
        with open(folder+'/README.md', "r") as originalChapter:
            fileString = originalChapter.read()

            # Correct path for images
            imgPattern = r'(\!\[.*?\]\()(.*)'
            subPattern = r'\1' + folder + r'/\2'
            modifiedChapterString = re.sub(imgPattern, subPattern, fileString)
            modifiedChapterString = injectShaderBlocks(folder, modifiedChapterString)
