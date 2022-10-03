import {WorkspaceView} from "../../common/ui/workspace/WorkspaceView";
const {ipcRenderer} = require("electron");

class AccountingWorkspaceView extends WorkspaceView {

    constructor() {
        super();
        this.register_event_handler();
    }

    static async create_workspace() : Promise<WorkspaceView> {
        let wsv = await WorkspaceView.create_workspace('accounting', __dirname);
        ipcRenderer.send('use_case:create', 'accounting', 'show_list');
        return wsv;
    }

    register_event_handler() {
        this.register_use_case_starter([
            '#read-csv-file',
            '#create-account'
        ]);
        this.register_sideboard_switches([
            '#cost-center-board-switch',
            '#account-board-switch'
        ]);
    }
}


module.exports = {AccountingWorkspaceView};
export {AccountingWorkspaceView}