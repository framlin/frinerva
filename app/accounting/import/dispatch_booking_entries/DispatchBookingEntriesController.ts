import {register_IPCMain_listener} from "../../../common/ui/ipc/register_IPCMain_listener";
import {UseCase} from "../../../common/use_case/UseCase";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {AccountData} from "../../account/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";

let controller: DispatchBookingEntriesController;

export class DispatchBookingEntriesController extends UseCaseController {
    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;
    }

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

