import xhr from 'xhr';
import GlslCanvas from 'glslCanvas';
import OpenFrameIcon from '../addons/openFrameIcon';

export default class GalleryItem {
    constructor (id, main, options) {
        this.id = id;
        this.main = main;
        this.options = options;

        // Construct Item
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'glslGallery_item');

        this.link = document.createElement('a');
        this.link.setAttribute('target', '_blank');

        this.img = document.createElement('img');
        this.img.setAttribute('class', 'glslGallery_thumb');

        this.credits = document.createElement('div');
        this.credits.setAttribute('class', 'glslGallery_credits');
        this.credits.style.visibility = 'hidden';

        if (this.id.match(/\d\d\/.*/)) {
            this.link.setAttribute('href', 'http://thebookofshaders.com/edit.html#' + this.id + '.frag');
            this.img.src = 'http://thebookofshaders.com/' + this.id + '.png';
        }
        else {
            this.link.setAttribute('href', 'http://' + this.options.clickRun + '.thebookofshaders.com/?log=' + this.id);
            this.img.src = 'http://thebookofshaders.com/log/' + this.id + '.png';
        }

        this.link.appendChild(this.img);
        this.el.appendChild(this.link);
        this.el.appendChild(this.credits);
        this.main.container.appendChild(this.el);

        // Add events
        if (this.options.hoverPreview) {
            this.el.addEventListener('mouseenter', () => {
                onEnter(this);
            });
            this.el.addEventListener('mouseleave', () => {
                onLeave(this);
            });
        }

        if (this.options.openFrameIcon) {
            this.openFrameIcon = new OpenFrameIcon(this);
        }

        this.init();
    }

    init () {
        if (!this.source || this.source === '') {
            var url = '';
            if (this.id.match(/\d\d\/.*/)) {
                url = 'http://thebookofshaders.com/' + this.id + '.frag';
            }
            else {
                url = 'http://thebookofshaders.com/log/' + this.id + '.frag';
            }
            let item = this;
            xhr.get(url, (error, res, body) => {
                if (error) {
                    console.error('Error downloading ', error);
                    return;
                }
                item.setCode(body);
            });
        }
    }

    load (code) {
        this.setCode(code);
        window.glslGallery_canvas.load(code);
        window.glslGallery_canvas.canvas.style.height = this.img.offsetHeight + 'px';
        this.link.appendChild(window.glslGallery_canvas.canvas);
    }

    setCode (code) {
        this.source = code;

        if (!this.author && this.options.showAuthor) {
            this.author = this.getAuthor();
            if (this.author !== 'unknown') {
                let authorEl = document.createElement('p');
                authorEl.setAttribute('class', 'glslGallery_label glslGallery_author');
                authorEl.innerHTML = this.author;
                this.credits.appendChild(authorEl);
                this.credits.style.visibility = 'visible';
            }
        }

        if (!this.title && this.options.showTitle) {
            this.title = this.getTitle();
            if (this.title !== 'unknown') {
                let titleEl = document.createElement('p');
                titleEl.setAttribute('class', 'glslGallery_label glslGallery_title');
                titleEl.innerHTML = this.title;
                this.credits.appendChild(titleEl);
                this.credits.style.visibility = 'visible';
            }
        }
    }

    getCode () {
        return this.source;
    }

    getTitle() {
        var result = this.source.match(/\/\/\s*[T|t]itle\s*:\s*([\w|\s|\@|\(|\)|\-|\_]*)/i);
        if (result && !(result[1] === ' ' || result[1] === '')) {
            return result[1].replace(/(\r\n|\n|\r)/gm, '');
        }
        else {
            return 'unknown';
        }
    }

    getAuthor() {
        var result = this.source.match(/\/\/\s*[A|a]uthor\s*[\:]?\s*([\w|\s|\@|\(|\)|\-|\_]*)/i);
        if (result && !(result[1] === ' ' || result[1] === '')) {
            return result[1].replace(/(\r\n|\n|\r)/gm, '');
        }
        else {
            return 'unknown';
        }
    }
}

function initCanvas() {
    if (!window.glslGallery_canvas) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('class', 'glslGallery_canvas');
        canvas.style.width = '250px';
        canvas.style.height = '250px';
        canvas.width = '250px';
        canvas.height = '250px';
        window.glslGallery_canvas = new GlslCanvas(canvas);
    }
}

function onEnter (item) {
    initCanvas();

    if (item.getCode()) {
        item.load(item.getCode());
    }
    else {
        var url = '';
        if (item.id.match(/\d\d\/.*/)) {
            url = 'http://thebookofshaders.com/' + item.id + '.frag';
        }
        else {
            url = 'http://thebookofshaders.com/log/' + item.id + '.frag';
        }

        xhr.get(url, (error, res, body) => {
            if (error) {
                console.error('Error downloading ', error);
                return;
            }
            item.load(body);
        });
    }
}

function onLeave (item) {
    initCanvas();

    if (item.el.getElementsByClassName('glslGallery_canvas') > 0) {
        // Remove glslCanvas instance from item
        item.el.removeChild(window.glslGallery_canvas.canvas);
    }
}
