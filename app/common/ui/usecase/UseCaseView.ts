import * as  path from "path";
import {IPCChannel} from "../../ipc/IPCChannel";
import {create_request_channel} from "../../ipc/RequestChannel";
import {create_response_channel} from "../../ipc/ResponseChannel";
import {UseCaseName} from "../../usecase/UseCaseName";
import {HTMLReader} from "../../util/HTMLReader";

export class UseCaseView {
    protected _response_channel: IPCChannel = create_response_channel();
    protected _request_channel: IPCChannel = create_request_channel();

    constructor(private _use_case_name: UseCaseName, private _domain_name?: string) {}

    link_style(stylesheet_filename: string) {
        const existing_link = document.querySelector(`link[href="${stylesheet_filename}"]`);
        if (!existing_link) {
            const head = document.getElementsByTagName('HEAD')[0];
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylesheet_filename;
            // noinspection TypeScriptValidateJSTypes
            head.appendChild(link);
        }
    }

    insert_partial(markup: string, frame: string) {
        const frame_div = document.querySelector(frame);
        if (frame_div) frame_div.innerHTML = markup;
    }

    async insert_markup_at(use_case_dir: string, target: string) {
        const markup = await HTMLReader.read_html_file(path.join(use_case_dir, this._use_case_name + '.html'));
        this.insert_partial(markup, target);
    }

    append_partial(markup: string, frame: string) {
        const frame_div = document.querySelector(frame);
        const partial_div = document.createElement('div');
        partial_div.innerHTML = markup;
        if (frame_div) { // noinspection TypeScriptValidateJSTypes
            frame_div.appendChild(partial_div);
        }
    }

    async append_markup_at(use_case_dir: string, target: string) {
        const markup = await HTMLReader.read_html_file(path.join(use_case_dir, this._use_case_name + '.html'));
        this.append_partial(markup, target);
    }

    link_styles(use_case_dir: string) {
        this.link_style(path.join(use_case_dir, 'design.css'));
        this.link_style(path.join(use_case_dir, 'layout.css'));
    }

    add_script(src: string) {
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${src}"]`);
            if (!script) {
                const s = document.createElement('script');

                s.setAttribute('src', src);
                s.addEventListener('load', resolve);
                s.addEventListener('error', reject);

                // noinspection TypeScriptValidateJSTypes
                document.body.appendChild(s);
            } else {
                resolve(true);
            }
        });
    }

    async create_view(): Promise<void> {};

    forward(use_case_name: UseCaseName) {
    }

    register_event_listener(): void {};

    async put_view_into_dom(...data: any[]) {
        await this.create_view();
        this.register_event_listener();
        this.send_view_ready(...data);
    }

    send_view_ready(...data: any[]) {
        console.log(`Sending view ready for ${this._use_case_name}`);
        this._request_channel.send('use_case:view_ready', this._domain_name, this._use_case_name, ...data);
    }
}


