const HTMLReader = require("../../util/HTMLReader");
const path = require("path");
const {ipcRenderer} = require("electron");
const ViewFactory = require("../../../main/factories/ViewFactory");

class WorkspaceView {

    switch_sideboard_to(sideboard_entry_selector) {
        this.clear_sideboard_entries();
        this.activate_sideboard_entry(sideboard_entry_selector);
    }

    clear_sideboard_entries() {
        let sideboard_entries = document.querySelectorAll('.sideboard-entry');
        sideboard_entries.forEach((entry) => {
            entry.classList.remove('active');
        });
    }

    activate_sideboard_entry(entry_selector) {
        let element = document.querySelector(entry_selector);
        element.classList.add('active');
    }

    register_sideboard_switches(side_board_switch_selector_list) {
        for (let selector of side_board_switch_selector_list) {
            this.register_sideboard_switch(selector) ;
        }
    }

    register_sideboard_switch(sidebar_switch_selector) {
        let sidebar_switch = document.querySelector(sidebar_switch_selector);
        sidebar_switch.addEventListener('click', (e) => {
            let switch_to_selector = sidebar_switch.getAttribute('switch_to');
            this.switch_sideboard_to(switch_to_selector);
        });
    }

    register_use_case_starter(use_case_starter_selector_list) {
        for (let selector of use_case_starter_selector_list) {
            this.register_use_case_starter_btn(selector)
        }
    }

    register_use_case_starter_btn(btn_selector) {
        let use_case_starter = document.querySelector(btn_selector);
        let use_case_name = use_case_starter.getAttribute('use_case_name')
        use_case_starter.addEventListener('click', (e) => {
            ipcRenderer.send('use_case:create', use_case_name);
        });
    }






    static replace_partial(markup, overlay) {
        let overlay_div = document.querySelector(overlay);
        let partial_frame_div = document.createElement('div');
        partial_frame_div.innerHTML = markup;
        overlay_div.replaceWith(partial_frame_div.firstChild);

    }

    static async create_segment(markup_file, target) {
        let markup = await HTMLReader.read_html_file(markup_file);
        this.replace_partial(markup, target);

    }

    static mark_workspace(workspace_name) {
        let workspace = document.querySelector('#workspace');
        for(let cls of workspace.classList.values()) {
            workspace.classList.remove(cls);
        }
        workspace.classList.add(workspace_name);
    }


    static link_style(stylesheet_filename) {
        let head = document.getElementsByTagName('HEAD')[0];
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheet_filename;
        head.appendChild(link);
    }

    static splitter() {
        let pointer_down;
        let splitter = document.querySelector('#splitter-panel');
        let side_board = document.querySelector('.sideboard');
        let work_bench = document.querySelector('.workbench');

        function move_splitter(e) {
            if (pointer_down) {
                let x = e.layerX - 25;
                let grid = document.querySelector('#workspace');
                grid.style.gridTemplateColumns = `25px [side-board] ${x}px [splitter] 3px  [work-bench]`;
            }
        }

        function release() {
            pointer_down = false;
        }

        splitter.addEventListener('pointerdown', (e) => {
            pointer_down = true;
        });

        splitter.addEventListener('pointermove', move_splitter);
        work_bench.addEventListener('pointermove', move_splitter);
        side_board.addEventListener('pointermove', move_splitter);

        splitter.addEventListener('pointerup', release);
        side_board.addEventListener('pointerup', release)
        work_bench.addEventListener('pointerup', release)
    }

    static async create_segments(workspace_directory) {
        await this.create_segment(path.join(workspace_directory, 'workbench.html'), '.workbench');
        await this.create_segment(path.join(workspace_directory, 'sideboard.html'), '.sideboard');
        await this.create_segment(path.join(workspace_directory, 'sidebar.html'), '.sidebar');
        await this.create_segment(path.join(workspace_directory, 'toolbar.html'), '.toolbar');
    }

    static link_styles(workspace_directory) {
        this.link_style(path.join(workspace_directory, 'design.css'));
        this.link_style(path.join(workspace_directory, 'layout.css'));

    }

    static async create_workspace(workspace_name, workspace_directory) {
        this.mark_workspace(workspace_name);
        await this.create_segments(workspace_directory);
        this.link_styles(workspace_directory);
        this.splitter();
        return new WorkspaceView();
    }
}

ipcRenderer.on('use_case:created', async (e, use_case_name) => {
    await ViewFactory.create(use_case_name).put_view_into_dom();
});
module.exports = WorkspaceView;