const WorkspaceViewFactory = require ('./factories/WorkspaceViewFactory');
const WorkspaceView = require('../common/ui/workspace/WorkspaceView');
const AccountingWorkspaceView = require('../accounting/workspace/AccountingWorkspaceView');

WorkspaceViewFactory.config(AccountingWorkspaceView);

window.addEventListener('DOMContentLoaded', () => {
    WorkspaceView.splitter();
    register_accounting_switch_click();
});

function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    accounting_switch.addEventListener('click', async (e) => {
        await WorkspaceViewFactory.create('accounting');
    });
}

