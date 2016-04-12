export default class OpenFrameIcon {
    constructor (parent) {
        this.parent = parent;

        this.el = document.createElement('div');
        this.el.setAttribute('class', 'glslGallery_openFrameIcon');
        this.el.innerHTML = '[o]';
        this.el.addEventListener('click', () => {
            createOpenFrameArtwork(this.parent, () => {
                console.log(event);
            });
        }, true);

        this.parent.el.appendChild(this.el);
    }
}

export function createOpenFrameArtwork(item, callback) {
    let id = item.id;
    let title = item.title || 'unknow';
    let author = item.author || 'unknow';
    let xhr = new XMLHttpRequest();
    callback = callback || () => {};
    // anywhere in the API that user {id} is needed, the alias 'current' can be used for the logged-in user
    xhr.open('POST', 'http://openframe.io/api/users/current/owned_artwork', false);
    // set content type to JSON...
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // This is essential in order to include auth cookies:
    xhr.withCredentials = true;
    xhr.onload = (event) => {
        if (event.currentTarget.status === 404) {
            window.open('http://openframe.io/login-popup', 'login', 'width=500,height=600');
            let successListener = function(e) {
                if (e.data === 'success') {
                    createOpenFrameArtwork(item, callback);
                }
                window.removeEventListener('message', successListener);
            };
            window.addEventListener('message', successListener, false);
        }
        else if (event.currentTarget.status === 200) {
            callback(true);
        }
        else {
            callback(false);
        }
    };
    xhr.onerror = (event) => {
        console.log(event.currentTarget.status);
    };

    let url = '';
    if (id.match(/\d\d\/.*/)) {
        url = 'http://thebookofshaders.com/' + id;
    }
    else {
        url = 'http://thebookofshaders.com/log/' + id;
    }

    xhr.send(JSON.stringify({
        title: title,
        author_name: author,
        is_public: false,
        format: 'openframe-glslviewer',
        url: url + '.frag',
        thumb_url: url + '.png'
    }));
}
