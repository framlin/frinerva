import {Account} from "../../account/Account";

const {UseCaseHelper} = require("../../../common/use_case/UseCaseHelper");
const AccountingStorageHelper = require("../../../common/persistence/helper/AccountingHelper");

class DispatchBookingEntriesHelper extends UseCaseHelper{
    async load_account(booking_period: string, cost_center: string) {
        return await AccountingStorageHelper.load_account(booking_period, cost_center);
    }

    async save_account(account: Account) {
        await AccountingStorageHelper.save_account(account)
    }

    account_exists(booking_period: string, cost_center: string) {
        return AccountingStorageHelper.account_exists(booking_period, cost_center);
    }
}

module.exports = {DispatchBookingEntriesHelper};
export {DispatchBookingEntriesHelper}