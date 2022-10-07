"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseController = void 0;
const electron_1 = require("electron");
let controller;
class UseCaseController {
    constructor() {
        controller = this;
    }
    execute(...data) {
        if (this._request_boundary)
            this._request_boundary.execute(...data);
    }
    forward(use_case_name, ...data) {
        if (this._use_case)
            this._use_case.forward(use_case_name, ...data);
    }
    get request_boundary() {
        return this._request_boundary;
    }
    set request_boundary(value) {
        this._request_boundary = value;
    }
    get use_case() {
        return this._use_case;
    }
    set use_case(value) {
        this._use_case = value;
    }
    on_use_case_view_ready(...data) {
        this.execute(...data);
    }
}
exports.UseCaseController = UseCaseController;
electron_1.ipcMain.on('use_case:view_ready', (e, _domain_name, _use_case_name, ...data) => {
    controller.on_use_case_view_ready(...data);
});
module.exports = { UseCaseController };
//# sourceMappingURL=UseCaseController.js.map