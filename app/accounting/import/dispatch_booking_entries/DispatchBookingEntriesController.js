"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesController = void 0;
const UseCaseController_1 = require("../../../common/use_case/UseCaseController");
const electron_1 = require("electron");
let controller;
class DispatchBookingEntriesController extends UseCaseController_1.UseCaseController {
    constructor() {
        super();
        controller = this;
    }
    on_submit(virtual_account) {
        this._request_boundary.submit(virtual_account);
    }
}
exports.DispatchBookingEntriesController = DispatchBookingEntriesController;
electron_1.ipcMain.on('create_account:submit', (e, virtual_account) => {
    controller.on_submit(virtual_account);
});
module.exports = { DispatchBookingEntriesController };
//# sourceMappingURL=DispatchBookingEntriesController.js.map