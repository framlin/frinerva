import {Account, AccountData} from "../../account/Account";
import {Accounting} from "../../account/Accounting";
import {BookingRecordData} from "../../account/BookingRecord";
import {UseCaseInteractor} from "../../../common/use_case/UseCaseInteractor";
import {DispatchBookingEntriesResponseBoundary} from "./DispatchBookingEntriesResponseBoundary";
import {DispatchBookingEntriesHelper} from "./DispatchBookingEntriesHelper";
import {BookingEntry, BookingEntryData} from "../../account/BookingEntry";
import {Subject} from "../../../common/observation/Subject"
import {Observer} from "../../../common/observation/Observer";
import {Observable} from "../../../common/observation/Observable";

type AccountDict = { [key: string]: BookingEntryData[] }

class DispatchBookingEntriesInteractor extends UseCaseInteractor implements Observable<AccountData|undefined> {

    add(observer: Observer<AccountData>): void {
        this._subject.add(observer);
    }

    set state(value: AccountData|undefined) {
        this._subject.state = value;
    }

    get state() {
        return this._subject.state;
    }

    async execute(booking_records: BookingRecordData[]) {
        let account_dict = this.create_account_dict(booking_records);
        let virtual_accounts = await this.create_virtual_accounts(account_dict);
        this.response_boundary.show(virtual_accounts);
    }

    submit(virtual_account: AccountData) {
        this.state= virtual_account;
        console.log(virtual_account);
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

    private _extract_account_data(account: Account): AccountData {
        let result: AccountData = {
            booking_entries: [],
            booking_period: account.booking_period,
            cost_center: account.cost_center
        };
        for (let booking_entry of account.booking_entries) {
            let booking_entry_data = BookingEntry.implement_booking_entry_data();
            for (let prop in booking_entry_data) {
                // @ts-ignore
                booking_entry_data[prop] = booking_entry[prop];
            }
            result.booking_entries.push(booking_entry_data);
        }
        return result;
    }

    async create_virtual_accounts(account_dict: AccountDict): Promise<AccountData[]> {
        let accounting: Accounting = new Accounting(this.helper);
        let result: AccountData[] = [];
        let keys = Object.keys(account_dict)
        for await (let account_key of keys) {
            let [booking_period, cost_center] = account_key.split('!');
            let account = await accounting.create_virtual_account(booking_period, cost_center);
            let account_data = this._extract_account_data(account);
            let booking_entries = account_dict[account_key];
            for (let booking_entry of booking_entries) {
                account_data.booking_entries.push(booking_entry)
            }
            result.push(account_data);
        }
        return result;
    }

    get helper(): DispatchBookingEntriesHelper {
        return this._helper as DispatchBookingEntriesHelper;
    }

    get response_boundary(): DispatchBookingEntriesResponseBoundary {
        return this._response_boundary as DispatchBookingEntriesResponseBoundary;
    }

    set helper(value) {
        this._helper = value;
    }

    set response_boundary(value) {
        this._response_boundary = value;
    }

    private _subject = new Subject<AccountData|undefined>();

}

module.exports = {DispatchBookingEntriesInteractor};
export {DispatchBookingEntriesInteractor}