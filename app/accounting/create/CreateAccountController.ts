import {register_IPCMain_listener} from "../../common/ui/ipc/register_IPCMain_listener";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {CreateAccountInteractor} from "./CreateAccountInteractor";

let controller: CreateAccountController;

export class CreateAccountController extends UseCaseController {

    constructor(request_boundary: UseCaseRequestBoundary, use_case: UseCase) {
        super(request_boundary, use_case);
        controller = this;

    }

    register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('create_account:period_cost_center-selected', (e, period_cost_center) => {
            this.on_period_cost_center_selection(period_cost_center);
        });
        register_IPCMain_listener('create_account:create', (e, new_accounts_list) => {
            this.on_create(new_accounts_list);
        });
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


