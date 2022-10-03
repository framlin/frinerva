"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountHelper = void 0;
const { UseCaseHelper } = require("../../common/use_case/UseCaseHelper");
const AccountingStorageHelper = require("../../common/persistence/helper/AccountingHelper");
class CreateAccountHelper extends UseCaseHelper {
    async load_cost_center_configuration() {
        return await AccountingStorageHelper.load_cost_center_configuration();
    }
    async load_booking_period_configuration() {
        return await AccountingStorageHelper.load_booking_period_configuration();
    }
    async load_account(booking_period, cost_center) {
        return await AccountingStorageHelper.load_account(booking_period, cost_center);
    }
    async save_account(account) {
        await AccountingStorageHelper.save_account(account);
    }
    account_exists(booking_period, cost_center) {
        return AccountingStorageHelper.account_exists(booking_period, cost_center);
    }
}
exports.CreateAccountHelper = CreateAccountHelper;
module.exports = { CreateAccountHelper };
//# sourceMappingURL=CreateAccountHelper.js.map