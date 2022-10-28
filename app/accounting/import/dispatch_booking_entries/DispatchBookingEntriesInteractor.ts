import {Account, AccountData} from "../../account/Account";
import {Accounting} from "../../account/Accounting";
import {BookingRecordData} from "../../account/BookingRecord";
import {UseCaseInteractor} from "../../../common/use_case/UseCaseInteractor";
import {DispatchBookingEntriesResponseBoundary} from "./DispatchBookingEntriesResponseBoundary";
import {BookingEntryData} from "../../account/BookingEntry";

type AccountDict = { [key: string]: BookingEntryData[] }

class DispatchBookingEntriesInteractor extends UseCaseInteractor  {

    async execute(booking_records: BookingRecordData[]) {
        let account_dict = this.create_account_dict(booking_records);
        let virtual_accounts = await this.create_virtual_accounts(account_dict);
        this.response_boundary.show(virtual_accounts);
    }

    submit(virtual_account: AccountData) {
        (this._domain_entity as Accounting).create_account_from(virtual_account).then(() => {
            //signal(observable<Account>)
        });
    }

    create_account_dict(booking_records: BookingRecordData[]) {
        let result: AccountDict = {};
        for (let booking_record of booking_records) {
            let {booking_entry, cost_center, booking_period} = booking_record;
            let key = `${booking_period}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            } else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }

    private _extract_account_data(account: Account|null): AccountData {
        let result: AccountData = {
            booking_entries: [],
            booking_period: account ? account.booking_period : "",
            cost_center: account ? account.cost_center: ""
        };
        if (account) {
            for (let booking_entry of account.booking_entries) {
                let booking_entry_data = booking_entry.data
                result.booking_entries.push(booking_entry_data);
            }
        }
       return result;
    }

    async create_virtual_accounts(account_dict: AccountDict): Promise<AccountData[]> {
        let result: AccountData[] = [];
        let keys = Object.keys(account_dict)
        for await (let account_key of keys) {
            let [booking_period, cost_center] = account_key.split('!');
            let account = await (this._domain_entity as Accounting).create_virtual_account(booking_period, cost_center);
            let account_data = this._extract_account_data(account);
            let booking_entries = account_dict[account_key];
            for (let booking_entry of booking_entries) {
                account_data.booking_entries.push(booking_entry)
            }
            result.push(account_data);
        }
        return result;
    }


    get response_boundary(): DispatchBookingEntriesResponseBoundary {
        return this._response_boundary as DispatchBookingEntriesResponseBoundary;
    }


    set response_boundary(value) {
        this._response_boundary = value;
    }
}

module.exports = {DispatchBookingEntriesInteractor};
export {DispatchBookingEntriesInteractor}