const WorkspaceView = require("../../workspace/WorkspaceView");

class AccountingWorkspaceView extends WorkspaceView {

    constructor() {
        super();
        this.register_event_handler();
    }

    static async create_workspace() {
        await WorkspaceView.create_workspace('accounting', __dirname);
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


module.exports = AccountingWorkspaceView;