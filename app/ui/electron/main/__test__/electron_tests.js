const {ipcRenderer} = require("electron");
const WorkspaceViewFactory = require("../../../../factories/WorkspaceViewFactory");

let is_ready = false;

const METHODS = {
    set_ready() {
        is_ready = true;
    },

    isReady () {
        // do any setup needed
        return true
    },
    // define your RPC-able methods here
    a_test () {
        return 42;
    },
    //  open_main_window() {
    //     // create_main_window();
    //     // ipcRenderer.send('test:create_accounting_workspace');
    //      WorkspaceViewFactory.create('accounting');
    // }

}
module.exports = METHODS;