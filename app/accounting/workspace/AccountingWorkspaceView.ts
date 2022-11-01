import {WorkspaceView} from "../../common/ui/workspace/WorkspaceView";
import {ipcRenderer} from "electron";

export class AccountingWorkspaceView extends WorkspaceView {

    constructor() {
        super();
        this.register_event_handler();
    }

    static async create_workspace(workspace_name: string, workspace_directory: string = __dirname) : Promise<WorkspaceView> {
        const wsv = await super.create_workspace(workspace_name, workspace_directory);
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
