const {ipcRenderer} = require("electron");

function register_press_button() {
    let select_accounting_div = document.querySelector("#accounting-switch");
    select_accounting_div.addEventListener('click', (e) => {
        ipcRenderer.send('main:import');
        console.log("PRESS SELECT-ACCOUNTING")
    });

}

module.exports = register_press_button;
