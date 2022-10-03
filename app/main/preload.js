"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorkspaceView_1 = require("../common/ui/workspace/WorkspaceView");
const DomainViewFactory_1 = require("./DomainViewFactory");
window.addEventListener('DOMContentLoaded', () => {
    WorkspaceView_1.WorkspaceView.splitter();
    register_accounting_switch_click();
});
function register_accounting_switch_click() {
    let accounting_switch = document.querySelector('#accounting-switch');
    if (accounting_switch) {
        accounting_switch.addEventListener('click', async () => {
            await DomainViewFactory_1.DomainViewFactory.create_workspace('accounting');
        });
    }
}
//# sourceMappingURL=preload.js.map