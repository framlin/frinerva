import {Account} from "../account/Account";

const {UseCaseHelper} = require("../../common/use_case/UseCaseHelper");
const AccountingStorageHelper = require("../../common/persistence/helper/AccountingHelper");

class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await AccountingStorageHelper.load_cost_center_configuration();
    }

    async load_booking_period_configuration() {
        return await AccountingStorageHelper.load_booking_period_configuration();
    }

    async load_account(booking_period:string, cost_center: string) {
        return await AccountingStorageHelper.load_account(booking_period, cost_center);
    }

    async save_account(account: Account) {
        await AccountingStorageHelper.save_account(account)
    }

    account_exists(booking_period: string, cost_center: string) {
        return AccountingStorageHelper.account_exists(booking_period, cost_center);
    }

}

module.exports = {CreateAccountHelper};
export {CreateAccountHelper}