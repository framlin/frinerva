const HTMLReader = require("../../../util/HTMLReader");
const path = require("path");

class WorkspaceView {
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

    static async create_workspace(workspace_name, workspace_directory) {
        this.mark_workspace(workspace_name);
        this.link_style(path.join(workspace_directory, 'design.css'));
        this.link_style(path.join(workspace_directory, 'layout.css'));
        await this.create_segment(path.join(workspace_directory, 'workbench.html'), '.workbench');
        await this.create_segment(path.join(workspace_directory, 'sideboard.html'), '.sideboard');
        await this.create_segment(path.join(workspace_directory, 'sidebar.html'), '.sidebar');
        await this.create_segment(path.join(workspace_directory, 'toolbar.html'), '.toolbar');
        this.splitter();
        return new WorkspaceView();
    }
}

module.exports = WorkspaceView;