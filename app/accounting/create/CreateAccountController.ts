import {ipcMain} from "electron";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {CreateAccountInteractor} from "./CreateAccountInteractor";
import {UseCase} from "../../common/use_case/UseCase";

let controller: CreateAccountController
class CreateAccountController extends UseCaseController {

    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }
    period_cost_center_selection(period_cost_center: any) {
        (this._request_boundary as CreateAccountInteractor).period_cost_center_selection(period_cost_center);
    }

    create(new_accounts_list: any) {
        (this._request_boundary as CreateAccountInteractor).create(new_accounts_list).then();
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