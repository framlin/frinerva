import {UseCaseInteractor} from "../../../common/usecase/UseCaseInteractor";
import {AccountHandle} from "../../entites/AccountHandle";
import {Accounting} from "../../entites/Accounting";
import {AccountDescriptionLabel} from "./AccountDescriptionLabel";
import {CreateAccountRequestBoundary} from "./CreateAccountRequestBoundary";
import {BookingPeriodAccountDescriptionList} from "./BookingPeriodAccountDescriptionList";
import {CreateAccountHelper} from "./CreateAccountHelper";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";

export class CreateAccountInteractor extends UseCaseInteractor implements CreateAccountRequestBoundary {
    async execute() {
        const cost_center_config = await this.helper.load_cost_center_configuration();
        this.response_boundary.show_cost_center_list(JSON.parse(cost_center_config));

        const booking_period_config = await this.helper.load_booking_period_configuration();
        this.response_boundary.show_booking_period_list(JSON.parse(booking_period_config))
    }

    period_cost_center_selection(period_cost_center: BookingPeriodAccountDescriptionList) {
        const new_entry_list: AccountDescriptionLabel[] = [];
        for (const period_ of period_cost_center.periods) {
            const booking_period = period_;
            for (const cost_center_ of period_cost_center.accounts) {
                const cost_center = cost_center_.key;
                const label = cost_center_.label;
                new_entry_list.push({booking_period, cost_center, label});
            }
        }

        this.response_boundary.show_new_accounts_list(new_entry_list);
    }

    async create(new_accounts_list: AccountHandle[]) {
        for (const new_account of new_accounts_list) {
            const booking_period = new_account.booking_period;
            const cost_center = new_account.cost_center;
            const account = await (this._domain_entity as Accounting).create_account({booking_period, cost_center});
            if (!account) {
                this.response_boundary.show_error({error: 'ACCOUNT_EXIST', booking_period, cost_center});
            }
        }
        this.response_boundary.account_creation_done();
    }

    get helper(): CreateAccountHelper {
        return super.helper as CreateAccountHelper;
    }

    get response_boundary(): CreateAccountResponseBoundary {
        return super.response_boundary as CreateAccountResponseBoundary;
    }
}
