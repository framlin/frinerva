"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingHelper = void 0;
const JSONStorage = require("../json/JSONStorage");
const Account_1 = require("../../../accounting/account/Account");
const path = require("path");
const STORAGE_ROOT_DIR = path.join(__dirname, "../data");
const CONFIGURATION_ROOT_DIR = path.join(__dirname, "../../../accounting/configuration");
class AccountingHelper {
    static async load_cost_center_configuration() {
        return await JSONStorage.load(path.join(CONFIGURATION_ROOT_DIR, "cost-center.json"));
    }
    static async load_booking_period_configuration() {
        return await JSONStorage.load(path.join(CONFIGURATION_ROOT_DIR, "booking-period.json"));
    }
    static async load_account(booking_period, cost_center) {
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        if (JSONStorage.exists(account_file_name)) {
            let account = await JSONStorage.load(account_file_name);
            return Account_1.Account.create_from_JSON(account);
        }
        else {
            return Promise.resolve(null);
        }
    }
    static async save_account(account) {
        let serialized_account = JSON.stringify(account);
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${account.booking_period}/${account.cost_center}.json`);
        await JSONStorage.save(account_file_name, serialized_account);
    }
    static account_exists(booking_period, cost_center) {
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        return JSONStorage.exists(account_file_name);
    }
}
exports.AccountingHelper = AccountingHelper;
module.exports = { AccountingHelper };
//# sourceMappingURL=AccountingHelper.js.map