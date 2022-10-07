import {ipcMain} from "electron";
const {UseCaseController} = require("../../common/use_case/UseCaseController");

let controller: CreateAccountController
class CreateAccountController extends UseCaseController {

    constructor() {
        super();
        controller = this;
    }
    period_cost_center_selection(period_cost_center: any) {
        this._request_boundary.period_cost_center_selection(period_cost_center);
    }

    create(new_accounts_list: any) {
        this._request_boundary.create(new_accounts_list).then();
    }

    on_period_cost_center_selection(period_cost_center: any) {
        this.period_cost_center_selection(period_cost_center);
    }

    on_create(new_accounts_list: any) {
        this.create(new_accounts_list);
    }
}

ipcMain.on('create_account:period_cost_center-selected', (e, period_cost_center) => {
    controller.on_period_cost_center_selection(period_cost_center);
})

ipcMain.on('create_account:create', (e, new_accounts_list) => {
    controller.on_create(new_accounts_list);
});

module.exports = {CreateAccountController};
export {CreateAccountController}