import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";
import {Observer} from "../../common/observation/Observer";
import {register_IPCMain_listener} from "../../common/ui/ipc/register_IPCMain_listener";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Account, ACCOUNT_ID} from "../account/Account";

export class ShowListController extends UseCaseController implements Observer<Account> {
    CLASS_ID: Account = ACCOUNT_ID;

    register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('show_list:account_selected', (e, key: string) => {
            this.forward('show_account', key);
        });
    }

    signal(subject: Observable<Account>): void {
        this.request_boundary?.execute();
    }

    subscribe_at(observatory: Observatory) {
        observatory.subscribe(this);
    }
}

