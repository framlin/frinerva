"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCasePresenter = void 0;
const { ipcMain } = require('electron');
let presenter;
class UseCasePresenter {
    constructor(ipc_chanel) {
        this._ipc_channel = ipc_chanel;
        presenter = this;
    }
    show(...data) { }
    execute(use_case_name, ...data) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }
    forward(domain_name, use_case_name) {
        if (this._controller)
            this._controller.forward(domain_name, use_case_name);
    }
    get controller() {
        return this._controller;
    }
    set controller(value) {
        this._controller = value;
    }
    on_use_case_view_ready(...data) {
        if (this._controller)
            this._controller.execute(...data);
    }
}
exports.UseCasePresenter = UseCasePresenter;
ipcMain.on('use_case:view_ready', (e, domain_name, use_case_name, ...data) => {
    presenter.on_use_case_view_ready(...data);
});
module.exports = { UseCasePresenter };
//# sourceMappingURL=UseCasePresenter.js.map