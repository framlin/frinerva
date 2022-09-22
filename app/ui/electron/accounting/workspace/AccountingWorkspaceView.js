const WorkspaceView = require("../../workspace/WorkspaceView");

class AccountingWorkspaceView extends WorkspaceView {

    constructor() {
        super();
        this.register_event_handler();
        this.show_initial_state();
    }

    show_initial_state() {
        this.show_account_board();
    }

    show_account_board() {
        this.activate_sideboard_entry(".account-list");
        this.fill_account_list();
    }

    fill_account_list(){
        let account_list = document.querySelector('.sideboard-entry.account-list');

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