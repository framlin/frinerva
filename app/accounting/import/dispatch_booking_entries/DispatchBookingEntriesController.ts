import {register_IPCMain_listener} from "../../../common/ui/ipc/register_IPCMain_listener";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {AccountData} from "../../account/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";

export class DispatchBookingEntriesController extends UseCaseController {
    register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('create_account:submit', (e, virtual_account: AccountData) => {
            this.on_submit(virtual_account);
        });
    }

    on_submit(virtual_account: AccountData) {
        (this._request_boundary as DispatchBookingEntriesInteractor).submit(virtual_account);
    }

}

