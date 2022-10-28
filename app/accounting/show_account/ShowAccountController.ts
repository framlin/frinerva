import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Observer} from "../../common/observation/Observer";
import {Account, ACCOUNT_ID, AccountData} from "../account/Account";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";
import {ipcMain} from 'electron'
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../common/use_case/UseCase";
import {ShowAccountInteractor} from "./ShowAccountInteractor";
import {register_IPCMain_listener} from "../../common/ui/ipc/register_IPCMain_listener";

let controller: ShowAccountController;

export class ShowAccountController extends UseCaseController implements Observer<Account>{
    CLASS_ID: Account = ACCOUNT_ID;

    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }

    protected register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('show_account:submit', (e, account: AccountData) => {
            this.on_submit(account);
        });
     }

    signal(subject: Observable<Account>): void {
        //check if the subject is the current account and refresh the view
        // if (subject.state === this._current_account) {
        //     this._presenter.show(this._current_account);
        // }
    }

    subscribe_at(observatory: Observatory) {
        observatory.subscribe(this);
    }

    on_submit(account: AccountData) {
        (this._request_boundary as ShowAccountInteractor).submit(account);
    }
}

// ipcMain.on('show_account:submit_account', (_e, account: AccountData) => {
//     controller.on_submit(account);
// });


