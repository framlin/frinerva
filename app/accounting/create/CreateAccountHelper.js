"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountHelper = void 0;
const { UseCaseHelper } = require("../../common/use_case/UseCaseHelper");
const { AccountingHelper } = require("../../common/persistence/helper/AccountingHelper");
class CreateAccountHelper extends UseCaseHelper {
    async load_cost_center_configuration() {
        return await AccountingHelper.load_cost_center_configuration();
    }
    async load_booking_period_configuration() {
        return await AccountingHelper.load_booking_period_configuration();
    }
    async load_account(booking_period, cost_center) {
        return await AccountingHelper.load_account(booking_period, cost_center);
    }
    async save_account(account) {
        await AccountingHelper.save_account(account);
    }
    account_exists(booking_period, cost_center) {
        return AccountingHelper.account_exists(booking_period, cost_center);
    }
}
exports.CreateAccountHelper = CreateAccountHelper;
module.exports = { CreateAccountHelper };
//# sourceMappingURL=CreateAccountHelper.js.map