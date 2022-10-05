"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesHelper = void 0;
const UseCaseHelper_1 = require("../../../common/use_case/UseCaseHelper");
const AccountingHelper_1 = require("../../../common/persistence/helper/AccountingHelper");
class DispatchBookingEntriesHelper extends UseCaseHelper_1.UseCaseHelper {
    async load_account(booking_period, cost_center) {
        return await AccountingHelper_1.AccountingHelper.load_account(booking_period, cost_center);
    }
    async save_account(account) {
        await AccountingHelper_1.AccountingHelper.save_account(account);
    }
    account_exists(booking_period, cost_center) {
        return AccountingHelper_1.AccountingHelper.account_exists(booking_period, cost_center);
    }
}
exports.DispatchBookingEntriesHelper = DispatchBookingEntriesHelper;
module.exports = { DispatchBookingEntriesHelper };
//# sourceMappingURL=DispatchBookingEntriesHelper.js.map