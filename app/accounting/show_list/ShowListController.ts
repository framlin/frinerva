import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Observer} from "../../common/observation/Observer";
import {Account, ACCOUNT_ID} from "../account/Account";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";
import {ipcMain} from "electron";
import {ShowAccountController} from "../show_account/ShowAccountController";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../common/use_case/UseCase";

let controller: ShowAccountController;
class ShowListController extends UseCaseController implements Observer<Account>{
    CLASS_ID: Account = ACCOUNT_ID;

    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }


    signal(subject: Observable<Account>): void {
        this.request_boundary?.execute();
    }

    subscribe_at(observatory: Observatory) {
        observatory.subscribe(this);
    }
}

ipcMain.on('show_list:account_selected', (e, key:string) => {
    controller.forward('show_account', key);
});
module.exports = {ShowListController};
export {ShowListController}