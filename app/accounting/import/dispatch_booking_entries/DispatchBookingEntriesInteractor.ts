const {UseCaseInteractor} = require("../../../common/use_case/UseCaseInteractor");
const {Accounting} = require("../../account/Accounting");

class DispatchBookingEntriesInteractor extends UseCaseInteractor{
    async execute(booking_records: any[]) {
        let account_dict = this.create_account_dict(booking_records);
        let virtual_accounts = await this.create_virtual_accounts(account_dict);
        this._presenter.show_virtual_accounts(virtual_accounts);
    }

    create_account_dict(booking_records: any[]) {
        let result: any = {};
        for (let booking_record of booking_records) {
            let {booking_entry, cost_center, year} = booking_record;
            let key = `${year}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            } else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }

    async create_virtual_accounts(account_dict: any) {
        let accounting = new Accounting(this._helper);
        let result = [];
        let keys = Object.keys(account_dict)
        for await (let account_key of keys) {
            let [booking_period, cost_center] = account_key.split('!');
            let account = await accounting.create_virtual_account(booking_period, cost_center);
            let booking_entries = account_dict[account_key];
            for (let booking_entry of booking_entries) {
                account.booking_entries.push(booking_entry)
            }
            result.push(account);
        }
        return result;
    }
}

module.exports = {DispatchBookingEntriesInteractor};
export {DispatchBookingEntriesInteractor}