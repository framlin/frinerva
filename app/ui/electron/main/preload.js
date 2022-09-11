const {ipcRenderer} = require('electron');
const path = require('path')
const {create_workbench, create_side_board, create_side_bar, create_tool_bar} = require('../accounting/AccountingPreloader');

window.addEventListener('DOMContentLoaded', () => {
    splitter();
    register_accounting_switch_click();

});

function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    accounting_switch.addEventListener('click', (e) => {
        create_workbench(path.join(__dirname, '../accounting/work_bench.html')).then(() => {
            create_side_board(path.join(__dirname, '../accounting/side_board.html')).then(() => {
                create_side_bar(path.join(__dirname, '../accounting/side_bar.html')).then(() => {
                    create_tool_bar(path.join(__dirname, '../accounting/tool_bar.html')).then(() => {
                        splitter();
                    })
                })
            });
        });
    });
}

function splitter() {
    let pointer_down;
    let splitter = document.querySelector('#splitter-panel');
    let side_board = document.querySelector('.side-board-panel');
    let work_bench = document.querySelector('.work-bench-panel');

    function move_splitter(e) {
        if (pointer_down) {
            let x = e.layerX - 25;
            let body_elem = document.querySelector('body');
            body_elem.style.gridTemplateColumns = `25px [side-board] ${x}px [splitter] 3px  [work-bench]`;
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