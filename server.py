import http.server
import socketserver
import os
import re

PORT = 8000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/index.php':
            self.serve_php_page('index.php')
            return
        
        if self.path.endswith('/'):
            path_parts = self.path.strip('/').split('/')
            if len(path_parts) > 0:
                self.serve_chapter(self.path)
                return

        if '?' in self.path:
            clean_path, query = self.path.split('?', 1)
            if clean_path == '/' or clean_path == '/index.php':
                 self.serve_php_page('index.php', query)
                 return
            if clean_path.endswith('/'):
                 self.serve_chapter(clean_path, query)
                 return

        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def serve_chapter(self, path, query=''):
        lan_suffix = ''
        if 'lan=tr' in query:
            lan_suffix = '-tr'
        elif 'lan=es' in query:
            lan_suffix = '-es'
        elif 'lan=jp' in query:
            lan_suffix = '-jp'
        elif 'lan=fr' in query:
            lan_suffix = '-fr'

        local_path = path.strip('/')
        if local_path == '':
            readme_name = f'README{lan_suffix}.md'
        else:
            readme_name = os.path.join(local_path, f'README{lan_suffix}.md')

        if not os.path.exists(readme_name):
             readme_name = os.path.join(local_path, 'README.md')
        
        if not os.path.exists(readme_name):
            self.send_error(404, "File not found")
            return

        try:
            with open(readme_name, 'r', encoding='utf-8') as f:
                markdown_content = f.read()
        except:
             self.send_error(404, "File not found or readable")
             return

        html_content = self.convert_markdown(markdown_content)

        # Process PHP templates
        header = self.process_php_file('header.php')
        toc = self.process_php_file('toc-header.php')
        footer = self.process_php_file('footer.php')

        # Inject CSS/JS logic into header
        header = self.process_php_header_logic(header, lan_suffix)
        
        full_html = header + toc + '<div id="content">' + html_content + '</div>' + footer
        
        # Cleanup remaining PHP tags
        full_html = re.sub(r'<\?php.*?\?>', '', full_html, flags=re.DOTALL)
        
        depth = 0
        if path != '/' and path != '/index.php':
            depth = len(path.strip('/').split('/'))
        
        path_prefix = '../' * depth if depth > 0 else './'
        
        full_html = full_html.replace('.$path.', path_prefix)
        full_html = full_html.replace('".$path."', path_prefix)
        full_html = full_html.replace('$path', path_prefix)
        
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(full_html.encode('utf-8'))

    def process_php_file(self, filename):
        if not os.path.exists(filename): return ""
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Recursively handle includes
        # Handle <?php include("file"); ?> pattern specifically to strip tags
        def replace_include_block(match):
            inc_file = match.group(1)
            # Process the included file recursively
            return self.process_php_file(inc_file)
            
        # Match <?php include("..."); ?> or similar, extremely flexible
        content = re.sub(r'<\?php\s+include\s*\(\s*["\']([^"\']+)["\']\s*\);\s*\?>', replace_include_block, content, flags=re.DOTALL | re.IGNORECASE)

        # Fallback for straight includes without surrounding tags being matched
        def replace_include_only(match):
             inc_file = match.group(1)
             return self.process_php_file(inc_file)

        content = re.sub(r'include\s*\(\s*["\']([^"\']+)["\']\s*\);', replace_include_only, content, flags=re.IGNORECASE)
        
        return content

    def process_php_header_logic(self, html, lan_suffix):
        html = html.replace("'.$html_attributes.'", "")
        html = html.replace("'.$subtitle.'", "")
        
        if 'highlight.min.js' in html:
             html = re.sub(r'<\?php\s+echo\s+\'\s+<link.*?highlight\.min\.js.*?\?>', 
                           '<link type="text/css" rel="stylesheet" href="$path/css/github.css">\n<script type="text/javascript" src="$path/src/highlight.min.js"></script>', 
                           html, flags=re.DOTALL)

        glsl_canvas = '<script type="text/javascript" src="$path/src/glslCanvas/build/GlslCanvas.js"></script>'
        if not os.path.exists('src/glslCanvas/build/GlslCanvas.js'):
             glsl_canvas = '<script type="text/javascript" src="https://thebookofshaders.com/glslCanvas/GlslCanvas.js"></script>'
        
        html = re.sub(r'<\?php\s+if \(file_exists.*?GlslCanvas\.js.*?\?>', glsl_canvas, html, flags=re.DOTALL)

        glsl_editor = '''
        <link type="text/css" rel="stylesheet" href="$path/src/glslEditor/build/glslEditor.css">
        <script type="application/javascript" src="$path/src/glslEditor/build/glslEditor.js"></script>
        '''
        if not os.path.exists('src/glslEditor/build/glslEditor.js'):
             glsl_editor = '''
             <link type="text/css" rel="stylesheet" href="https://thebookofshaders.com/glslEditor/glslEditor.css">
             <script type="application/javascript" src="https://thebookofshaders.com/glslEditor/glslEditor.js"></script>
             '''
        html = re.sub(r'<\?php\s+if \(file_exists.*?glslEditor\.js.*?\?>', glsl_editor, html, flags=re.DOTALL)

        glsl_gallery = '''
        <link type="text/css" rel="stylesheet" href="$path/src/glslGallery/build/glslGallery.css">
        <script type="application/javascript" src="$path/src/glslGallery/build/glslGallery.js"></script>
        '''
        if not os.path.exists('src/glslGallery/build/glslGallery.js'):
             glsl_gallery = '''
             <link type="text/css" rel="stylesheet" href="https://thebookofshaders.com/glslGallery/glslGallery.css">
             <script type="application/javascript" src="https://thebookofshaders.com/glslGallery/glslGallery.js"></script>
             '''
        html = re.sub(r'<\?php\s+if \(file_exists.*?glslGallery\.js.*?\?>', glsl_gallery, html, flags=re.DOTALL)

        main_style = '<link type="text/css" rel="stylesheet" href="$path/css/style.css">'
        lang_style = ''
        if lan_suffix != '':
            style_name = f'css/style{lan_suffix}.css'
            if os.path.exists(style_name):
                 lang_style = f'<link type="text/css" rel="stylesheet" href="$path/{style_name}">'
        
        html = re.sub(r'<\?php\s+echo\s+\'\s+<link type="text/css" rel="stylesheet" href="\'.\$path\.\'/css/style\.css.*?\?>', 
                      main_style + lang_style, html, flags=re.DOTALL)

        return html

    def convert_markdown(self, text):
        html = text
        html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
        html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
        html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
        html = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', html)
        html = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1">', html)
        html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
        html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
        html = re.sub(r'\n\n', r'<br><br>', html)
        return html

    def serve_php_page(self, filename, query=''):
         self.serve_chapter('/', query)

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
