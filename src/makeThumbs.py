import glob, os, re, subprocess

# def injectShaderBlocks( _folder, _text ):
#     rta = ""
#     lines = _text.split('\n');
#     for line in lines:
#         if line.find('<canvas id=\"custom\" class=\"canvas\"') >= 0:
#             shaderFile = re.search("<canvas id=\"custom\" class=\"canvas\" data-fragment-url=\"(.*?)\"", line.rstrip(), re.S).group(1)
#             shaderName, shaderExt = os.path.splitext(shaderFile)

#             shaderPath = folder+"/"+shaderFile;

#             shaderString = open(shaderPath, 'r').read()
#             shaderImage = folder+"/"+shaderName+".png"
#             shaderCommand = "glslViewer " + shaderPath + " " + \
#                             " -s 0.5 -o " + shaderImage
#             print shaderCommand
#             returnCode = subprocess.call(shaderCommand, shell=True)

#         elif line.find('<div class=\"codeAndCanvas\"') >= 0:
#             shaderTextureResults = re.findall(r'<div class=\"codeAndCanvas\" data=\".*\" data-imgs=\"(.*)\"></div>', line.rstrip())
#             shaderFile = re.sub(r'<div class=\"codeAndCanvas\" data=\"(.*?)\"(>| .+>)</div>', r'\1', line.rstrip())

#             shaderName,shaderExt = os.path.splitext(shaderFile)

#             shaderPath = folder+"/"+shaderFile;
#             if shaderTextureResults:
#                 shaderTexturePaths = map (lambda f: folder+"/"+f, shaderTextureResults[0].split(","))
#             else:
#                 shaderTexturePaths = []

#             shaderString = open(shaderPath, 'r').read()
#             shaderImage = folder+"/"+shaderName+".png"
#             shaderCommand = "glslViewer " + shaderPath + " " + \
#                             " ".join(shaderTexturePaths) + \
#                             " -s 0.5 -o " + shaderImage
#             print shaderCommand
#             returnCode = subprocess.call(shaderCommand, shell=True)

d='..'
folders = [os.path.join(d,o) for o in os.listdir(d) if os.path.isdir(os.path.join(d,o))];
folders.sort()
for folder in folders:
    for filename in glob.glob(folder+'/*.frag'):
        # print filename
        shaderPath = filename;
        shaderName,shaderExt = os.path.splitext(filename)
        shaderImage = shaderName+".png"
        shaderCommand = "glslViewer " + shaderPath + " " + \
                            " -s 0.5 -o " + shaderImage
        print shaderCommand
        # returnCode = subprocess.call(shaderCommand, shell=True)

