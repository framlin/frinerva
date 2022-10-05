import {Account} from "../account/Account";

import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {AccountingHelper} from "../../common/persistence/helper/AccountingHelper";

class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await AccountingHelper.load_cost_center_configuration();
    }

    async load_booking_period_configuration() {
        return await AccountingHelper.load_booking_period_configuration();
    }

    async load_account(booking_period:string, cost_center: string) {
        return await AccountingHelper.load_account(booking_period, cost_center);
    }

    async save_account(account: Account) {
        await AccountingHelper.save_account(account)
    }

    account_exists(booking_period: string, cost_center: string) {
        return AccountingHelper.account_exists(booking_period, cost_center);
    }

}

module.exports = {CreateAccountHelper};
export {CreateAccountHelper}