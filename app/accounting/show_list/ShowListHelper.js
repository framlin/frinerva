"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListHelper = void 0;
const UseCaseHelper_1 = require("../../common/use_case/UseCaseHelper");
const JSONStorage_1 = require("../../common/persistence/json/JSONStorage");
const AccountingHelper_1 = require("../../common/persistence/helper/AccountingHelper");
const path = __importStar(require("path"));
const STORAGE_ROOT_DIR = path.join(__dirname, "../../common/persistence/data");
class ShowListHelper extends UseCaseHelper_1.UseCaseHelper {
    async get_account_name_list() {
        let result = [];
        let name_list = await JSONStorage_1.JSONStorage.get_name_list(path.join(STORAGE_ROOT_DIR, `account`, ""));
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