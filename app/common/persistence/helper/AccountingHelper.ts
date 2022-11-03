import {AccountHandle} from "../../../accounting/entites/AccountHandle";
import {DomainHelper} from "../../domain/DomainHelper";
import {JSONStorage} from "../json/JSONStorage";
import {Account} from "../../../accounting/entites/Account";

const path = require("path");
const STORAGE_ROOT_DIR = path.join(__dirname,"../data");
const CONFIGURATION_ROOT_DIR = path.join(__dirname,"../../../accounting/configuration");

export class AccountingHelper extends DomainHelper{
    static async load_cost_center_configuration() : Promise<string> {
        return await JSONStorage.load(path.join(CONFIGURATION_ROOT_DIR, "cost-center.json"));
    }

    static async load_booking_period_configuration()  : Promise<string> {
        return await JSONStorage.load(path.join(CONFIGURATION_ROOT_DIR, "booking-period.json"));
    }

    static async load_account({booking_period, cost_center}: AccountHandle) : Promise<Account|null>{
        const account_file_name: string = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        if (JSONStorage.exists(account_file_name)) {
            const account: string = await JSONStorage.load(account_file_name);
            return Account.create_from_JSON(account)
        } else {
            return Promise.resolve(null);
        }
    }

    static async save_account(account: Account) {
        const serialized_account: string = JSON.stringify(account);
        const account_file_name: string = path.join(STORAGE_ROOT_DIR, `account/${account.booking_period}/${account.cost_center}.json`);
        await JSONStorage.save(account_file_name, serialized_account);
    }

    static account_exists({booking_period, cost_center}: AccountHandle) {
        const account_file_name: string = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        return JSONStorage.exists(account_file_name);
    }

    static async get_account_name_list() {
        const result = [];
        const name_list =  await JSONStorage.get_name_list(path.join(STORAGE_ROOT_DIR, `account`, ""));
        for (const {dir_name, filename} of name_list) {
            const booking_period: string = dir_name || "";
            const cost_center: string = filename.split('.')[0];
            result.push({booking_period, cost_center});
        }
        return result;
    }
}
