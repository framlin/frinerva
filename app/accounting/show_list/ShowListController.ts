import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Observer} from "../../common/observation/Observer";
import {Account, ACCOUNT_ID} from "../account/Account";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";
import {ipcMain} from "electron";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../common/use_case/UseCase";
import {register_IPCMain_listener} from "../../common/ui/ipc/register_IPCMain_listener";

let controller: ShowListController;

export class ShowListController extends UseCaseController implements Observer<Account> {
    CLASS_ID: Account = ACCOUNT_ID;

    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }

    register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('show_list:account_selected', (e, key: string) => {
            this.forward('show_account', key);
        })
        // ipcMain.removeAllListeners('show_list:account_selected');
        // ipcMain.on('show_list:account_selected', (e, key: string) => {
        //     this.forward('show_account', key);
        // });
    }

    signal(subject: Observable<Account>): void {
        this.request_boundary?.execute();
    }

    subscribe_at(observatory: Observatory) {
        observatory.subscribe(this);
    }
}

