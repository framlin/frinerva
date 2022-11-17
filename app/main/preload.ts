import {WorkspaceView} from '../common/ui/workspace/WorkspaceView';
import {WorkspaceViewFactory} from "../common/factories/WorkspaceViewFactory";

window.addEventListener('DOMContentLoaded', () => {
    WorkspaceView.splitter();
    register_accounting_switch_click();
});

function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    if (accounting_switch) {
        accounting_switch.addEventListener('click', async () => {
            await WorkspaceViewFactory.create('accounting');
        });
    }
}

function register_balancing_switch_click() {
    let balancing_switch = document.querySelector('#accounting-switch');
    if (balancing_switch) {
        balancing_switch.addEventListener('click', async () => {
            await WorkspaceViewFactory.create('balancing');
        });
    }
}

