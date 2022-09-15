const WorkspaceView = require("../../workspace/WorkspaceView");
const {ipcRenderer} = require('electron');
const ViewFactory = require("../../../../factories/ViewFactory");

class AccountingWorkspaceView extends WorkspaceView{

    constructor() {
        super();
        this.register_read_csv_file_use_case();
        this.register_create_account_use_case();
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

    static async create_workspace() {
        await WorkspaceView.create_workspace('accounting', __dirname);
    }
}


ipcRenderer.on('use_case:created', async (e, use_case_name) => {
    await ViewFactory.create(use_case_name).put_view_into_dom();
});

module.exports = AccountingWorkspaceView;