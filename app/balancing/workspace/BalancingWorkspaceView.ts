import {ipcRenderer} from "electron";
import {WorkspaceView} from "../../common/ui/workspace/WorkspaceView";

export class BalancingWorkspaceView extends WorkspaceView {

    constructor() {
        super();
        this.register_event_handler();
    }

    static async create_workspace(workspace_name: string, workspace_directory: string = __dirname) : Promise<WorkspaceView> {
        const wsv = await super.create_workspace(workspace_name, workspace_directory);
        ipcRenderer.send('use_case:create', 'balancing', 'show_list');
        return wsv;
    }

    register_event_handler() {
   }
}