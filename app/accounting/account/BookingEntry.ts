import {BOOKING_CODE} from "./BOOKING_CODE";
import { v4 as uuidv4 } from 'uuid';
interface BookingEntryData {
    date: Date;
    subject: string;
    name:string;
    amount: number;
    booking_code: string;
    id: string;
}

class BookingEntry implements BookingEntryData{
    static property_mapping = ['date', 'subject', 'name', 'amount', 'booking_code', 'id'];

    static implement_booking_entry_data() {
        let properties = BookingEntry.property_mapping.slice();
        let entry: BookingEntryData = properties.reduce((previous: any, current: any) => {
            previous[current] = ""
            return previous;
        }, {});
        return entry;
    }

    _date: Date = new Date();
    _subject: string;
    _name: string;
    _amount: number;
    _booking_code: string;
    _id: string;

    constructor(date?: Date, subject?: string, name?:string, amount?: number, booking_code?: string, id?: string) {
        this._date = date || new Date();
        this._subject = subject || "";
        this._name = name || "";
        this._amount = amount || 0.00;
        this._booking_code = booking_code || BOOKING_CODE.NONE;
        this._id = id || BookingEntry.generate_id();
    }

    get id () {
        return this._id;
    }

    get date (): Date{
        return this._date ? this._date : new Date();
    }

    set date (date) {
        this._date = date;
    }

    get subject() {
        return this._subject;
    }

    set subject(subject) {
        this._subject = subject;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get amount() {
        return this._amount;
    }

    get amount_as_string(): string {
        return this._amount.toFixed(2);
    }

    set amount(amount) {
        this._amount = amount;
    }

    get booking_code() {
        return this._booking_code;
    }

    set booking_code(booking_code) {
        this._booking_code = booking_code;
    }

    static generate_id() {
        // return crypto.randomUUID();
        return uuidv4();
    }

    static create_from_JSON(serialized_booking_entry: string): BookingEntry {
        let booking_entry_data = JSON.parse(serialized_booking_entry);
        return new BookingEntry(new Date(booking_entry_data._date), booking_entry_data._subject,
            booking_entry_data._name, booking_entry_data._amount, booking_entry_data._booking_code,
            booking_entry_data._id);
    }

    toString() {
        return `${this.date.toLocaleString('de-DE').split(',')[0]}; ${this.subject}; ${this.name}; ${this.amount}; ${this.booking_code}`;
    }
}
module.exports = {BookingEntry};

export {BookingEntry, BookingEntryData}