const {ipcRenderer} = require("electron");

class UseCaseView{

    forward(use_case_name) {
    }

    put_view_into_dom() {
        this.send_view_ready();
    }

    send_view_ready() {
        ipcRenderer.send('use_case:view_ready');
    }
}

module.exports = UseCaseView;