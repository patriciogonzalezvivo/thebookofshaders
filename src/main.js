
// PARSING
//---------------------------------------------------------------

//  Graph plotter function take from
//  From http://blog.hvidtfeldts.net/index.php/2011/07/plotting-high-frequency-functions-using-a-gpu/
var preFunction = "\n\
#ifdef GL_ES\n\
precision mediump float;\n\
#endif\n\
\n\
#define PI 3.14159265359\n\
\n\
uniform vec2 u_resolution;\n\
uniform vec2 u_mouse;\n\
uniform float u_time;\n\
\n\
float lineJitter = 0.5;\n\
float lineWidth = 7.0;\n\
float gridWidth = 1.7;\n\
float scale = 0.0013;\n\
float zoom = 2.5;\n\
vec2 offset = vec2(0.5);\n\
\n\
float rand (in float _x) {\n\
    return fract(sin(_x)*1e4);\n\
}\n\
\n\
float rand (in vec2 co) {\n\
    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);\n\
}\n\
\n\
float noise (in float _x) {\n\
    float i = floor(_x);\n\
    float f = fract(_x);\n\
    float u = f * f * (3.0 - 2.0 * f);\n\
    return mix(rand(i), rand(i + 1.0), u);\n\
}\n\
\n\
float noise (in vec2 _st) {\n\
    vec2 i = floor(_st);\n\
    vec2 f = fract(_st);\n\
    // Four corners in 2D of a tile\n\
    float a = rand(i);\n\
    float b = rand(i + vec2(1.0, 0.0));\n\
    float c = rand(i + vec2(0.0, 1.0));\n\
    float d = rand(i + vec2(1.0, 1.0));\n\
    vec2 u = f * f * (3.0 - 2.0 * f);\n\
    return mix(a, b, u.x) + \n\
            (c - a)* u.y * (1.0 - u.x) + \n\
            (d - b) * u.x * u.y;\n\
}\n\
\n\
float function(in float x) {\n\
    float y = 0.0;\n";

var postFunction = "\n\
    return y;\n\
}\n\
\n\
vec3 plot2D(in vec2 _st, in float _width ) {\n\
    const float samples = 3.0;\n\
\n\
    vec2 steping = _width*vec2(scale)/samples;\n\
    \n\
    float count = 0.0;\n\
    float mySamples = 0.0;\n\
    for (float i = 0.0; i < samples; i++) {\n\
        for (float j = 0.0;j < samples; j++) {\n\
            if (i*i+j*j>samples*samples) \n\
                continue;\n\
            mySamples++;\n\
            float ii = i + lineJitter*rand(vec2(_st.x+ i*steping.x,_st.y+ j*steping.y));\n\
            float jj = j + lineJitter*rand(vec2(_st.y + i*steping.x,_st.x+ j*steping.y));\n\
            float f = function(_st.x+ ii*steping.x)-(_st.y+ jj*steping.y);\n\
            count += (f>0.) ? 1.0 : -1.0;\n\
        }\n\
    }\n\
    vec3 color = vec3(1.0);\n\
    if (abs(count)!=mySamples)\n\
        color = vec3(abs(float(count))/float(mySamples));\n\
    return color;\n\
}\n\
\n\
vec3 grid2D( in vec2 _st, in float _width ) {\n\
    float axisDetail = _width*scale;\n\
    if (abs(_st.x)<axisDetail || abs(_st.y)<axisDetail) \n\
        return 1.0-vec3(0.65,0.65,1.0);\n\
    if (abs(mod(_st.x,1.0))<axisDetail || abs(mod(_st.y,1.0))<axisDetail) \n\
        return 1.0-vec3(0.80,0.80,1.0);\n\
    if (abs(mod(_st.x,0.25))<axisDetail || abs(mod(_st.y,0.25))<axisDetail) \n\
        return 1.0-vec3(0.95,0.95,1.0);\n\
    return vec3(0.0);\n\
}\n\
\n\
void main(){\n\
    vec2 st = (gl_FragCoord.xy/u_resolution.xy)-offset;\n\
    st.x *= u_resolution.x/u_resolution.y;\n\
\n\
    scale *= zoom;\n\
    st *= zoom;\n\
\n\
    vec3 color = plot2D(st,lineWidth);\n\
    color -= grid2D(st,gridWidth);\n\
\n\
    gl_FragColor = vec4(color,1.0);\n\
}";

var glslCanvas = [];
var glslEditors = [];
var glslGraphs = [];

function styleCodeBlocks() {
    // Highlight code blocks
    var list = document.getElementsByTagName("code");
    for(var i = 0; i < list.length; i++){
        if (list[i].className == "language-glsl" ||
            list[i].className == "language-bash" ||
            list[i].className == "language-cpp" ||
            list[i].className == "language-html" ||
            list[i].className == "language-processing" ){
            hljs.highlightBlock(list[i]);
        }
    }
}

function loadGlslElements() {

    // Load single Shaders
    var canvas = document.getElementsByClassName("canvas");
    for (var i = 0; i < canvas.length; i++){
        glslCanvas.push(new GlslCanvas(canvas[i]));
    }

    // parse EDITORS
	var ccList = document.querySelectorAll(".codeAndCanvas");
	for(var i = 0; i < ccList.length; i++){
		if (ccList[i].hasAttribute("data")){
            var srcFile = ccList[i].getAttribute("data");
            var editor = new GlslEditor(ccList[i], {
                canvas_size: 250,
                canvas_follow: true,
                canvas_float: 'right',
                tooltips: true,
                exportIcon: true
            });
            editor.open(srcFile);
            glslEditors.push(editor);
        }
    }

    // parse GRAPHS
    var sfList = document.querySelectorAll(".simpleFunction");
    for(var i = 0; i < sfList.length; i++){
        if (sfList[i].hasAttribute("data")){
            var srcFile = sfList[i].getAttribute("data");
            glslGraphs.push(new GlslEditor(sfList[i], {
                canvas_width: 800,
                lineNumbers: false,
                canvas_height: 250,
                canvas_follow: true,
                canvas_float: false,
                frag_header: preFunction,
                frag_footer: postFunction,
                tooltips: true
            }).open(srcFile));
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function captionizeImages() {
    if (!document.getElementsByTagName)
        return false;

    if (!document.createElement)
        return false;

    var images = document.getElementsByTagName("img");
    if (images.length < 1)
        return false;

    for (var i = 0; i < images.length; i++) {
        var title = images[i].getAttribute("alt");
        if (title && title !== ''){
            var divCaption = document.createElement("div");
            divCaption.className = "caption";
            var divCaption_text = document.createTextNode(title);
            divCaption.appendChild(divCaption_text);
            var divContainer = document.createElement("div");
            divContainer.className="imgcontainer";
            images[i].parentNode.insertBefore(divContainer,images[i]);
            divContainer.appendChild(images[i]);
            insertAfter(divCaption,images[i]);
        }
    }
}

// NAVIGATION
//-----------------------------------------------------------------------

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function checkUrl(url) {
    var request = false;
    if (window.XMLHttpRequest) {
            request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHttp");
    }

    if (request) {
            request.open("GET", url);
            if (request.status == 200) { return true; }
    }

    return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function previusPage() {
	var path = window.location.pathname;

	var n = parseInt( path.match( /[0-1].(?!.*[0-1])/ )[0] );
    var url;
	n -= 1;
    if(n < 0){
        url = "../";
    } else {
        url = "../" + FormatNumberLength(n,2) + "/";
    }

    var language = getParameterByName('lan');
    if (language !== ""){
        url += "?lan="+language;
    }

	window.location.href =  url;
}

function homePage() {
    var language = getParameterByName('lan');

    if (language !== ""){
        language = "?lan=" + language;
    }

	window.location.href = "../"  + language;
}

function nextPage() {
	var path = window.location.pathname;

	var n = parseInt( path.match( /[0-1].(?!.*[0-1])/ )[0] );
	n += 1;
	var url = "../" + FormatNumberLength(n,2) + "/";

    var language = getParameterByName('lan');
    if (language !== ""){
        url += "?lan="+language;
    }

	window.location.href =  url;
}

function enableThemeSwitcher() {
    function setTheme(theme) {
        document.body.dataset.theme = currentTheme;
        switcher.innerText = 'Turn ' + (theme === 'light' ? 'off' : 'on') + ' the lights';
    }

    var switcher = document.createElement('button');
    switcher.setAttribute('type', 'button');
    switcher.classList.add('themeSwitcher');
    switcher.addEventListener('click', function(event) {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        setTheme(currentTheme);
    } );

    var className = window.location.pathname === '/' ? 'toc-header' : 'header';
    var header = document.getElementsByClassName(className)[0];
    header.insertAdjacentElement('beforeend', switcher);

    var currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
}

window.addEventListener("load", function(){
    enableThemeSwitcher();
    styleCodeBlocks();
    loadGlslElements();
    captionizeImages();
    window.scrollTo(0, 0);
    setTimeout(function () {
         window.scrollTo(0, 0);
    }, 500);
});
