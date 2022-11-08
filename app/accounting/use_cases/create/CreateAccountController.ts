import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {AccountHandle} from "../../entites/AccountHandle";
import {CreateAccountInteractor} from "./CreateAccountInteractor";
import {CreateAccountRequestChannelName} from "./CreateAccountRequestChannelName";
import {TBookingPeriodAccountDescriptionList} from "./TBookingPeriodAccountDescriptionList";


export class CreateAccountController extends UseCaseController {

    register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver<CreateAccountRequestChannelName>('create_account:period_cost_center_selection', (e, period_cost_center) => {
            this.on_period_cost_center_selection(period_cost_center);
        });
        this._request_channel.register_receiver<CreateAccountRequestChannelName>('create_account:create', (e, new_accounts_list) => {
            this.on_create(new_accounts_list);
        });
    }

    period_cost_center_selection(period_cost_center: TBookingPeriodAccountDescriptionList
    ) {
        (this._request_boundary as CreateAccountInteractor).period_cost_center_selection(period_cost_center);
    }

    create(new_accounts_list: AccountHandle[]) {
        (this._request_boundary as CreateAccountInteractor).create(new_accounts_list).then();
    }

    on_period_cost_center_selection(period_cost_center: TBookingPeriodAccountDescriptionList
    ) {
        this.period_cost_center_selection(period_cost_center);
    }

    on_create(new_accounts_list: AccountHandle[]) {
        this.create(new_accounts_list);
    }
}


