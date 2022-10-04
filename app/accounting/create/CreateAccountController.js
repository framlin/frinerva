"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountController = void 0;
const electron_1 = require("electron");
const { UseCaseController } = require("../../common/use_case/UseCaseController");
let controller;
class CreateAccountController extends UseCaseController {
    constructor() {
        super();
        controller = this;
    }
    period_cost_center_selection(period_cost_center) {
        this._interactor.period_cost_center_selection(period_cost_center);
    }
    create(new_accounts_list) {
        this._interactor.create(new_accounts_list).then();
    }
    on_period_cost_center_selection(period_cost_center) {
        this.period_cost_center_selection(period_cost_center);
    }
    on_create(new_accounts_list) {
        this.create(new_accounts_list);
    }
}
exports.CreateAccountController = CreateAccountController;
electron_1.ipcMain.on('create_account:period_cost_center-selected', (e, period_cost_center) => {
    controller.on_period_cost_center_selection(period_cost_center);
});
electron_1.ipcMain.on('create_account:create', (e, new_accounts_list) => {
    controller.on_create(new_accounts_list);
});
module.exports = { CreateAccountController };
//# sourceMappingURL=CreateAccountController.js.map