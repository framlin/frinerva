const {ipcRenderer} = require("electron");
const HTMLReader = require("../../util/HTMLReader");
const path = require("path");


class UseCaseView {

    _use_case_name;

    constructor(use_case_name) {
        this._use_case_name = use_case_name;
    }

    link_style(stylesheet_filename) {
        let head = document.getElementsByTagName('HEAD')[0];
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheet_filename;
        head.appendChild(link);
    }


    insert_partial(markup, frame) {
        let frame_div = document.querySelector(frame);
        frame_div.innerHTML = markup;
    }

    async insert_markup_at(use_case_dir, target) {
        let markup = await HTMLReader.read_html_file(path.join(use_case_dir, this._use_case_name + '.html'));
        this.insert_partial(markup, target);
    }

    link_styles(use_case_dir) {
        this.link_style(path.join(use_case_dir, 'design.css'));
        this.link_style(path.join(use_case_dir, 'layout.css'));
    }

    async create_view() {
        //abstract
    }

    forward(use_case_name) {
    }

    register_event_listener(){
        //abstract
    }
    async put_view_into_dom() {
        await this.create_view();
        this.register_event_listener();
        this.send_view_ready();
    }

    send_view_ready() {
        ipcRenderer.send('use_case:view_ready');
    }
}

module.exports = UseCaseView;

