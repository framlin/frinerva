const HTMLReader = require('../../../util/HTMLReader');

function replace_partial(markup, overlay) {
    let overlay_div = document.querySelector(overlay);
    let partial_frame_div = document.createElement('div');
    partial_frame_div.innerHTML = markup;
    overlay_div.replaceWith(partial_frame_div.firstChild);

}
async function create_workbench(markup_file) {
    let workbench_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(workbench_markup, '.work-bench-panel');
}

async function create_side_board(markup_file) {
    let side_board_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(side_board_markup, '.side-board-panel');
}

async function create_side_bar(markup_file) {
    let side_bar_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(side_bar_markup, '.side-bar-panel');
}

async function create_tool_bar(markup_file) {
    let tool_bar_markup = await HTMLReader.read_html_file(markup_file);
    replace_partial(tool_bar_markup, '.tool-bar-panel');
}


module.exports = {create_workbench, create_side_board, create_side_bar, create_tool_bar};