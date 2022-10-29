import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {Accounting} from "../account/Accounting";
import {CreateAccountHelper} from "./CreateAccountHelper";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";

export class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this.helper.load_cost_center_configuration();
        this.response_boundary.show_cost_center_list(JSON.parse(cost_center_config));

        let booking_period_config = await this.helper.load_booking_period_configuration();
        this.response_boundary.show_booking_period_list(JSON.parse(booking_period_config))
    }

    period_cost_center_selection(period_cost_center: { periods: any; accounts: any; }) {
        let new_entry_list = []
        let booking_period;
        let cost_center;
        let label;
        for (let period_ of period_cost_center.periods) {
            booking_period = period_;
            for (let cost_center_ of period_cost_center.accounts) {
                cost_center = cost_center_.key;
                label = cost_center_.label;
                new_entry_list.push({booking_period, cost_center, label});
            }
        }

        this.response_boundary.show_new_accounts_list(new_entry_list);
    }

    async create(new_accounts_list: any) {
        for (let new_account of new_accounts_list) {
            let booking_period = new_account.booking_period;
            let cost_center = new_account.cost_center;
            let account = await (this._domain_entity as Accounting).create_account(booking_period, cost_center);
            if (!account) {
                this.response_boundary.show_error({error: 'ACCOUNT_EXIST', booking_period, cost_center});
            }
        }
        this.response_boundary.account_creation_done();
    }

    get helper(): CreateAccountHelper {
        return this._helper as CreateAccountHelper;
    }

    get response_boundary(): CreateAccountResponseBoundary {
        return this._response_boundary as CreateAccountResponseBoundary;
    }

    set helper(value) {
        this._helper = value;
    }

    set response_boundary(value) {
        this._response_boundary = value;
    }


}
