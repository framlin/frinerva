import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {ipcMain} from "electron";
import {AccountData} from "../../account/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../../common/use_case/UseCase";

let controller: DispatchBookingEntriesController;
class DispatchBookingEntriesController extends UseCaseController {
    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }
    on_submit(virtual_account: AccountData) {
        (this._request_boundary as DispatchBookingEntriesInteractor).submit(virtual_account);
    }


}

ipcMain.on('create_account:submit', (e, virtual_account: AccountData) => {
    controller.on_submit(virtual_account);
});

module.exports = {DispatchBookingEntriesController};
export {DispatchBookingEntriesController}