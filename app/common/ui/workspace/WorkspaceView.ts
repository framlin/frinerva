import {UseCaseName} from "../../usecase/UseCaseName";
import {HTMLReader} from "../../util/HTMLReader";
import * as path from "path";
import {ipcRenderer} from "electron";
import {ViewFactory}  from "../../factories/ViewFactory";
import {create_request_channel} from "../../ipc/RequestChannel";
import {UseCaseRequestChannelName} from "../../usecase/UseCaseRequestChannelName";

class WorkspaceView {

    static async create_workspace(workspace_name: string, workspace_directory: string): Promise<WorkspaceView> {
        this.mark_workspace(workspace_name);
        await this.create_segments(workspace_directory);
        this.link_styles(workspace_directory);
        this.splitter();
        return new WorkspaceView();
    }

    switch_sideboard_to(sideboard_entry_selector: string) {
        this.clear_sideboard_entries();
        this.activate_sideboard_entry(sideboard_entry_selector);
    }

    clear_sideboard_entries() {
        const sideboard_entries = document.querySelectorAll('.sideboard-entry');
        sideboard_entries.forEach((entry) => {
            entry.classList.remove('active');
        });
    }

    activate_sideboard_entry(entry_selector: string) {
        const element = document.querySelector(entry_selector);
        if (element) element.classList.add('active');
    }

    register_sideboard_switches(side_board_switch_selector_list: string[]) {
        for (const selector of side_board_switch_selector_list) {
            this.register_sideboard_switch(selector) ;
        }
    }

    register_sideboard_switch(sidebar_switch_selector: string) {
        const sidebar_switch = document.querySelector(sidebar_switch_selector);
        if (sidebar_switch) sidebar_switch.addEventListener('click', () => {
            if (sidebar_switch) {
                const switch_to_selector = sidebar_switch.getAttribute('switch_to');
                if (switch_to_selector) this.switch_sideboard_to(switch_to_selector);
            }
        });
    }

    register_use_case_starter(use_case_starter_selector_list: string[]) {
        for (const selector of use_case_starter_selector_list) {
            this.register_use_case_starter_btn(selector)
        }
    }

    register_use_case_starter_btn(btn_selector: string) {
        const use_case_starter = document.querySelector(btn_selector);
        if (use_case_starter) {
            // @ts-ignore
            const use_case_name = use_case_starter.dataset.use_case_name;
            // @ts-ignore
            const domain_name = use_case_starter.dataset.domain_name;
            use_case_starter.addEventListener('click', () => {
                create_request_channel().send<UseCaseRequestChannelName>('use_case:create', domain_name, use_case_name);
            });
        }
    }
    static replace_partial(markup: string, overlay: string) {
        const overlay_div = document.querySelector(overlay);
        const partial_frame_div = document.createElement('div');
        if (partial_frame_div) {
            partial_frame_div.innerHTML = markup;
            if (overlay_div) {
                // @ts-ignore
                overlay_div.replaceWith(partial_frame_div.firstChild);
            }
        }
    }

    static async create_segment(markup_file: string, target: string) {
        const markup = await HTMLReader.read_html_file(markup_file);
        this.replace_partial(markup, target);

    }

    static mark_workspace(workspace_name: string) {
        const workspace = document.querySelector('#workspace');
        if (workspace) {
            //@ts-ignore
            for(const cls of workspace.classList.values()) {
                workspace.classList.remove(cls);
            }
            workspace.classList.add(workspace_name);
        }
    }


    static link_style(stylesheet_filename: string) {
        const head = document.getElementsByTagName('HEAD')[0];
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheet_filename;
        // noinspection TypeScriptValidateJSTypes
        head.appendChild(link);
    }

    static splitter() {
        let pointer_down: boolean;
        const splitter = document.querySelector('#splitter-panel')!;
        const side_board = document.querySelector('.sideboard')!;
        const work_bench = document.querySelector('.workbench')!;

        function move_splitter(e: any) {
            if (pointer_down) {
                const x = e.layerX - 25;
                const grid = document.querySelector('#workspace')!;
                // @ts-ignore
                grid.style.gridTemplateColumns = `25px [side-board] ${x}px [splitter] 3px  [work-bench]`;
            }
        }

        function release() {
            pointer_down = false;
        }

        splitter.addEventListener('pointerdown', () => {
            pointer_down = true;
        });

        splitter.addEventListener('pointermove', move_splitter);
        work_bench.addEventListener('pointermove', move_splitter);
        side_board.addEventListener('pointermove', move_splitter);

        splitter.addEventListener('pointerup', release);
        side_board.addEventListener('pointerup', release)
        work_bench.addEventListener('pointerup', release)
    }

    static async create_segments(workspace_directory: string) {
        await this.create_segment(path.join(workspace_directory, 'workbench.html'), '.workbench');
        await this.create_segment(path.join(workspace_directory, 'sideboard.html'), '.sideboard');
        await this.create_segment(path.join(workspace_directory, 'sidebar.html'), '.sidebar');
        await this.create_segment(path.join(workspace_directory, 'toolbar.html'), '.toolbar');
    }

    static link_styles(workspace_directory: string) {
        this.link_style(path.join(workspace_directory, 'design.css'));
        this.link_style(path.join(workspace_directory, 'layout.css'));

    }

}

ipcRenderer.on('use_case:created', async (e, use_case_name: UseCaseName, ...data: any[]) => {
    await ViewFactory.create(use_case_name).put_view_into_dom(...data);
});
module.exports = {WorkspaceView};
export {WorkspaceView}