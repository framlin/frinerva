import {Account} from "./Account";
const {BookingEntry} = require("./BookingEntry");


class Accounting{

    _account_storage;

    constructor(account_storage:any) {
        this._account_storage = account_storage;
    }

    static create_booking_entry(date: Date, subject: string, name: string, amount: number, booking_code: string) {
        return new BookingEntry(date, subject, name, amount, booking_code);
    }

    async create_account(booking_period: string, cost_center: string): Promise<Account | null> {
        let account: Account | null = null;
        if (!this._account_storage.account_exists(booking_period, cost_center)) {
            account = new Account(booking_period, cost_center);
            await this._account_storage.save_account(account);
        }
        return account;
    }

    async create_virtual_account(booking_period: string, cost_center: string) {
        let result;
        if (this._account_storage.account_exists(booking_period, cost_center)) {
            result = await this._account_storage.load_account(booking_period, cost_center);
        } else {
            result = new Account(booking_period, cost_center);
        }
        return result;
    }

    async get_account_names() {
        let account_storage_names =  await this._account_storage.get_account_name_list();
        let cost_center_configuration = await this._account_storage.load_cost_center_configuration();
        let cost_center_mapping = JSON.parse(cost_center_configuration);
        let result = [];
        for (let {booking_period, cost_center} of account_storage_names) {
            let account_name = cost_center_mapping[cost_center];
            result.push(`${booking_period} - ${account_name}`);
        }
        return result;
    }

}

module.exports = {Accounting};

export {Accounting}