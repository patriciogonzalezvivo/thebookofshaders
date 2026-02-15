import os
import re

class MockHandler:
    def process_php_file(self, filename):
        print(f"Processing {filename}")
        if not os.path.exists(filename): return ""
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        def replace_include_block(match):
            inc_file = match.group(1)
            return self.process_php_file(inc_file)
            
        content = re.sub(r'<\?php\s+include\s*\(\s*["\']([^"\']+)["\']\s*\);\s*\?>', replace_include_block, content, flags=re.DOTALL | re.IGNORECASE)

        def replace_include_only(match):
             inc_file = match.group(1)
             return self.process_php_file(inc_file)

        content = re.sub(r'include\s*\(\s*["\']([^"\']+)["\']\s*\);', replace_include_only, content, flags=re.IGNORECASE)
        
        return content

    def process_php_header_logic(self, html, lan_suffix):
        print("Processing header logic")
        html = html.replace("'.$html_attributes.'", "")
        html = html.replace("'.$subtitle.'", "")
        
        if 'highlight.min.js' in html:
             html = re.sub(r'<\?php\s+echo\s+\'\s+<link.*?highlight\.min\.js.*?\?>', 
                           '<link type="text/css" rel="stylesheet" href="$path/css/github.css">\n<script type="text/javascript" src="$path/src/highlight.min.js"></script>', 
                           html, flags=re.DOTALL)

        glsl_canvas = '<script type="text/javascript" src="$path/src/glslCanvas/build/GlslCanvas.js"></script>'
        # Mock assumption for file check
        
        html = re.sub(r'<\?php\s+if \(file_exists.*?GlslCanvas\.js.*?\?>', glsl_canvas, html, flags=re.DOTALL)

        glsl_editor = '''
        <link type="text/css" rel="stylesheet" href="$path/src/glslEditor/build/glslEditor.css">
        <script type="application/javascript" src="$path/src/glslEditor/build/glslEditor.js"></script>
        '''
        html = re.sub(r'<\?php\s+if \(file_exists.*?glslEditor\.js.*?\?>', glsl_editor, html, flags=re.DOTALL)

        glsl_gallery = '''
        <link type="text/css" rel="stylesheet" href="$path/src/glslGallery/build/glslGallery.css">
        <script type="application/javascript" src="$path/src/glslGallery/build/glslGallery.js"></script>
        '''
        html = re.sub(r'<\?php\s+if \(file_exists.*?glslGallery\.js.*?\?>', glsl_gallery, html, flags=re.DOTALL)

        main_style = '<link type="text/css" rel="stylesheet" href="$path/css/style.css">'
        lang_style = ''
        if lan_suffix != '':
            style_name = f'css/style{lan_suffix}.css'
             # Mock existence check
            lang_style = f'<link type="text/css" rel="stylesheet" href="$path/{style_name}">'
        
        html = re.sub(r'<\?php\s+echo\s+\'\s+<link type="text/css" rel="stylesheet" href="\'.\$path\.\'/css/style\.css.*?\?>', 
                      main_style + lang_style, html, flags=re.DOTALL)

        return html

h = MockHandler()
header = h.process_php_file('header.php')
toc = h.process_php_file('toc-header.php')
footer = h.process_php_file('footer.php')
header = h.process_php_header_logic(header, '-tr')

full = header + toc + "CONTENT" + footer
print("Full length:", len(full))
