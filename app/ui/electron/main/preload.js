const {ipcRenderer} = require('electron');
const path = require('path')
const WorkspaceViewFactory = require ('../../../factories/WorkspaceViewFactory');
const WorkspaceView = require('../workspace/WorkspaceView');
const AccountingWorkspace = require('../accounting/workspace/AccountingWorkspaceView');

WorkspaceViewFactory.config(AccountingWorkspace);

let accounting_workspace;

window.addEventListener('DOMContentLoaded', () => {
    WorkspaceView.splitter();
    register_accounting_switch_click();
});

function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    accounting_switch.addEventListener('click', async (e) => {
        accounting_workspace =  await WorkspaceViewFactory.create('accounting');
    });
}
