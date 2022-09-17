const WorkspaceView = require("../../workspace/WorkspaceView");
const {ipcRenderer} = require('electron');
const ViewFactory = require("../../../../factories/ViewFactory");

class AccountingWorkspaceView extends WorkspaceView{

    constructor() {
        super();
        this.register_event_handler();
    }

    register_read_csv_file_use_case () {
        let read_csv_button = document.querySelector('#read-csv-file');
        read_csv_button.addEventListener('click', (e) => {
            ipcRenderer.send('use_case:create', 'read_csv_file');
        });
    };

    register_create_account_use_case () {
        let read_csv_button = document.querySelector('#create-account');
        read_csv_button.addEventListener('click', (e) => {
            ipcRenderer.send('use_case:create', 'create_account');
        });
    };

    register_event_handler() {
        console.log("AccountingWorkspaceView::register_event_handler")
        this.register_read_csv_file_use_case();
        this.register_create_account_use_case();
    }

    static async create_workspace() {
        await WorkspaceView.create_workspace('accounting', __dirname);
    }
}




module.exports = AccountingWorkspaceView;