const UseCaseView = require("../../../use_case/UseCaseView");
const {ipcRenderer} = require("electron");

let read_csv_file_view;

class ReadCSVFileView extends UseCaseView {
    constructor() {
        super();
        read_csv_file_view = this;
    }

    put_view_into_dom() {
        let account_panel = document.querySelector('#account-panel');
        let message = document.createElement('div');
        message.innerHTML = '<h1>HALLO WELT</h1>'
        account_panel.appendChild(message);
        this.send_view_ready();
    }


}

module.exports = ReadCSVFileView;