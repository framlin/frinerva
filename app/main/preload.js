const { WorkspaceView }= require('../common/ui/workspace/WorkspaceView');
const {DomainViewFactory} = require('./DomainViewFactory');

window.addEventListener('DOMContentLoaded', () => {
    WorkspaceView.splitter();
    register_accounting_switch_click();
});

function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    accounting_switch.addEventListener('click', async () => {
        await DomainViewFactory.create_workspace('accounting');
    });
}

