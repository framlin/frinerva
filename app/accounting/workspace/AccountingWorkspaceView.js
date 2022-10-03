"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingWorkspaceView = void 0;
const WorkspaceView_1 = require("../../common/ui/workspace/WorkspaceView");
const { ipcRenderer } = require("electron");
class AccountingWorkspaceView extends WorkspaceView_1.WorkspaceView {
    constructor() {
        super();
        this.register_event_handler();
    }
    static async create_workspace() {
        let wsv = await WorkspaceView_1.WorkspaceView.create_workspace('accounting', __dirname);
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
exports.AccountingWorkspaceView = AccountingWorkspaceView;
module.exports = { AccountingWorkspaceView };
//# sourceMappingURL=AccountingWorkspaceView.js.map