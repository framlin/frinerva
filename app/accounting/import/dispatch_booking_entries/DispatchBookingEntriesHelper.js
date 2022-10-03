const {UseCaseHelper} = require("../../../common/use_case/UseCaseHelper");
const AccountingStorageHelper = require("../../../common/persistence/helper/AccountingHelper");

class DispatchBookingEntriesHelper extends UseCaseHelper{
    async load_account(booking_period, cost_center) {
        return await AccountingStorageHelper.load_account(booking_period, cost_center);
    }

    async save_account(account) {
        await AccountingStorageHelper.save_account(account)
    }

    account_exists(booking_period, cost_center) {
        return AccountingStorageHelper.account_exists(booking_period, cost_center);
    }
}

module.exports = DispatchBookingEntriesHelper;