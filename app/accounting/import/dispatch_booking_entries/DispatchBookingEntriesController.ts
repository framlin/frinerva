import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {ipcMain} from "electron";
import {AccountData} from "../../account/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";

let controller: DispatchBookingEntriesController;
class DispatchBookingEntriesController extends UseCaseController {
    constructor() {
        super();
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