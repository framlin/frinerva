const {ipcRenderer} = require("electron");
const {HTMLReader} = require("../../util/HTMLReader");
const path = require("path");


abstract class UseCaseView {

    _use_case_name;
    _domain_name;

    constructor(domain_name: string, use_case_name: string) {
        this._use_case_name = use_case_name;
        this._domain_name = domain_name;
    }

    link_style(stylesheet_filename: string) {
        let existing_link = document.querySelector(`link[href="${stylesheet_filename}"]`);
        if (!existing_link) {
            let head = document.getElementsByTagName('HEAD')[0];
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylesheet_filename;
            head.appendChild(link);
        }
    }


    insert_partial(markup: string, frame: string) {
        let frame_div = document.querySelector(frame);
        if (frame_div) frame_div.innerHTML = markup;
    }

    async insert_markup_at(use_case_dir: string, target: string) {
        let markup = await HTMLReader.read_html_file(path.join(use_case_dir, this._use_case_name + '.html'));
        this.insert_partial(markup, target);
    }

    append_partial(markup: string, frame: string) {
        let frame_div = document.querySelector(frame);
        let partial_div = document.createElement('div');
        partial_div.innerHTML = markup;
        if (frame_div) frame_div.appendChild(partial_div);
    }

    async append_markup_at(use_case_dir: string, target: string) {
        let markup = await HTMLReader.read_html_file(path.join(use_case_dir, this._use_case_name + '.html'));
        this.append_partial(markup, target);
    }

    link_styles(use_case_dir: string) {
        this.link_style(path.join(use_case_dir, 'design.css'));
        this.link_style(path.join(use_case_dir, 'layout.css'));
    }

    add_script(src: string) {
        return new Promise((resolve, reject) => {
            let script = document.querySelector(`script[src="${src}"]`);
            if (!script) {
                const s = document.createElement('script');

                s.setAttribute('src', src);
                s.addEventListener('load', resolve);
                s.addEventListener('error', reject);

                document.body.appendChild(s);
            } else {
                resolve(true);
            }


        });
    }

     // @ts-ignore
    abstract async create_view(): void;

    forward(use_case_name: string) {
    }

    abstract register_event_listener(): void;

    async put_view_into_dom(...data: any[]) {
        await this.create_view();
        this.register_event_listener();
        this.send_view_ready(...data);
    }

    send_view_ready(...data: any[]) {
        ipcRenderer.send('use_case:view_ready', this._domain_name, this._use_case_name, ...data);
    }
}

module.exports = {UseCaseView};
export {UseCaseView}

