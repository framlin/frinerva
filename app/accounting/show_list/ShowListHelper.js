"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListHelper = void 0;
const UseCaseHelper_1 = require("../../common/use_case/UseCaseHelper");
const JSONStorage = require("../../common/persistence/json/JSONStorage");
const path = require("path");
const AccountingHelper_1 = require("../../common/persistence/helper/AccountingHelper");
const STORAGE_ROOT_DIR = path.join(__dirname, "../../common/persistence/data");
class ShowListHelper extends UseCaseHelper_1.UseCaseHelper {
    async get_account_name_list() {
        let result = [];
        let name_list = await JSONStorage.get_name_list(path.join(STORAGE_ROOT_DIR, `account`, ""));
        for (let { dir_name, filename } of name_list) {
            let booking_period = dir_name;
            let cost_center = filename.split('.')[0];
            result.push({ booking_period, cost_center });
        }
        return result;
    }
    async load_cost_center_configuration() {
        return await AccountingHelper_1.AccountingHelper.load_cost_center_configuration();
    }
}
exports.ShowListHelper = ShowListHelper;
module.exports = { ShowListHelper };
//# sourceMappingURL=ShowListHelper.js.map