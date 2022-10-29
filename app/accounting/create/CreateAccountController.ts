import {register_IPCMain_listener} from "../../common/ui/ipc/register_IPCMain_listener";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {AccountDescription} from "./AccountDescription";
import {BookingPeriodAccountDescriptionList} from "./BookingPeriodAccountDescriptionList";
import {CreateAccountInteractor} from "./CreateAccountInteractor";


export class CreateAccountController extends UseCaseController {

    register_ipc_listener() {
        super.register_ipc_listener();
        register_IPCMain_listener('create_account:period_cost_center-selected', (e, period_cost_center) => {
            this.on_period_cost_center_selection(period_cost_center);
        });
        register_IPCMain_listener('create_account:create', (e, new_accounts_list) => {
            this.on_create(new_accounts_list);
        });
    }

    period_cost_center_selection(period_cost_center: BookingPeriodAccountDescriptionList
    ) {
        (this._request_boundary as CreateAccountInteractor).period_cost_center_selection(period_cost_center);
    }

    create(new_accounts_list: AccountDescription[]) {
        (this._request_boundary as CreateAccountInteractor).create(new_accounts_list).then();
    }

    on_period_cost_center_selection(period_cost_center: BookingPeriodAccountDescriptionList
    ) {
        this.period_cost_center_selection(period_cost_center);
    }

    on_create(new_accounts_list: AccountDescription[]) {
        this.create(new_accounts_list);
    }
}


