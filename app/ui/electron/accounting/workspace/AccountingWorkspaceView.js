const WorkspaceView = require("../../workspace/WorkspaceView");

class AccountingWorkspaceView extends WorkspaceView{
    static async create_workspace() {
        await WorkspaceView.create_workspace('accounting', __dirname);
        return new AccountingWorkspaceView();
    }
}

module.exports = AccountingWorkspaceView;