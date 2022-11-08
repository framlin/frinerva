import {UseCaseInteractor} from "../../../../common/use_case/UseCaseInteractor";
import {Account, AccountData} from "../../../entites/Account";
import {Accounting} from "../../../entites/Accounting";
import {BookingEntryData} from "../../../entites/BookingEntry";
import {BookingRecordData} from "../../../entites/BookingRecord";

type AccountDict = { [key: string]: BookingEntryData[] }

export class DispatchBookingEntriesInteractor extends UseCaseInteractor  {

    async execute(booking_records: BookingRecordData[]) {
        const account_dict = this.create_account_dict(booking_records);
        const virtual_accounts = await this.create_virtual_accounts(account_dict);
        this.response_boundary.show(virtual_accounts);
    }

    submit(virtual_account: AccountData) {
        (this._domain_entity as Accounting).create_account_from(virtual_account).then(() => {
            //signal(observable<Account>)
        });
    }

    create_account_dict(booking_records: BookingRecordData[]) {
        const result: AccountDict = {};
        for (const booking_record of booking_records) {
            const {booking_entry, cost_center, booking_period} = booking_record;
            const key = `${booking_period}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            } else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }

    private static _extract_account_data(account: Account|null): AccountData {
        const result: AccountData = {
            booking_entries: [],
            booking_period: account ? account.booking_period : "",
            cost_center: account ? account.cost_center: ""
        };
        if (account) {
            for (const booking_entry of account.booking_entries) {
                const booking_entry_data = booking_entry.data
                result.booking_entries.push(booking_entry_data);
            }
        }
       return result;
    }

    async create_virtual_accounts(account_dict: AccountDict): Promise<AccountData[]> {
        const result: AccountData[] = [];
        const keys = Object.keys(account_dict)
        for await (const account_key of keys) {
            const [booking_period, cost_center] = account_key.split('!');
            const account = await (this._domain_entity as Accounting).create_virtual_account({booking_period, cost_center});
            const account_data = DispatchBookingEntriesInteractor._extract_account_data(account);
            const booking_entries = account_dict[account_key];
            for (const booking_entry of booking_entries) {
                account_data.booking_entries.push(booking_entry)
            }
            result.push(account_data);
        }
        return result;
    }
}
