const HTMLReader = require('../../../../util/HTMLReader');
const path = require("path");


function replace_partial(markup, overlay) {
    let overlay_div = document.querySelector(overlay);
    let partial_frame_div = document.createElement('div');
    partial_frame_div.innerHTML = markup;
    overlay_div.replaceWith(partial_frame_div.firstChild);

}

async function create_workbench(markup_file) {
    let workbench_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(workbench_markup, '.workbench');
}

async function create_side_board(markup_file) {
    let side_board_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(side_board_markup, '.sideboard');
}

async function create_side_bar(markup_file) {
    let side_bar_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(side_bar_markup, '.sidebar');
}

async function create_tool_bar(markup_file) {
    let tool_bar_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(tool_bar_markup, '.toolbar');
}

function mark_workspace() {
    let workspace = document.querySelector('#workspace');
    for(let cls of workspace.classList.values()) {
        workspace.classList.remove(cls);
    }
    workspace.classList.add('accounting');
}
class AccountingWorkspace {
    static async create_workspace() {
        mark_workspace();
        await create_workbench(path.join(__dirname, 'workbench.html'));
        await create_side_board(path.join(__dirname, 'sideboard.html'));
        await create_side_bar(path.join(__dirname, 'sidebar.html'));
        await create_tool_bar(path.join(__dirname, 'toolbar.html'));
    }
}

module.exports = AccountingWorkspace;