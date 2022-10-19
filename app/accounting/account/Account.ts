import {BookingEntry, BookingEntryData} from "./BookingEntry";

interface AccountData {
    booking_period: string;
    cost_center: string;
    booking_entries: BookingEntryData[];
}

class Account implements AccountData{
    constructor(private _booking_period: string, private _cost_center: string) {
        this._booking_entries = [];
    }

    get data() {
        let result: AccountData = {
            booking_period: this._booking_period,
            cost_center: this._cost_center,
            booking_entries: []
        };
        for (let booking_entry of this._booking_entries) {
            result.booking_entries.push(booking_entry.data);
        }
        return result;
    }

    get cost_center() {
        return this._cost_center;
    }

    get booking_period() {
        return this._booking_period;
    }

    get booking_entries() {
        return this._booking_entries;
    }

    set booking_entries(booking_entries) {
        this._booking_entries = booking_entries;
    }

    add(booking_entry: any) {
        this._booking_entries.push(booking_entry);
    }

    serialize() {
        return JSON.stringify(this);
    }

    static create_from_JSON(json_string: string) {
        let account_data = JSON.parse(json_string);
        let account = new Account(account_data._booking_period, account_data._cost_center);
        let json_booking_entries = account_data._booking_entries;

        for (let json_booking_entry of json_booking_entries) {
            let booking_entry = new BookingEntry(
                new Date(json_booking_entry._date),
                json_booking_entry._subject,
                json_booking_entry._name,
                json_booking_entry._amount,
                json_booking_entry._booking_code,
                json_booking_entry._id
            );
            account.add(booking_entry);
        }
        return account;
    }

    private _booking_entries: BookingEntry[];
}

const ACCOUNT_ID = new Account("", "");

module.exports = {Account};
export {Account, AccountData, ACCOUNT_ID};