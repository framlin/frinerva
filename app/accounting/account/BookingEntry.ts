import {v4 as uuidv4} from 'uuid';
import {BOOKING_CODE} from "./BOOKING_CODE";

interface BookingEntryData {
    date_as_string: string;
    date: Date;
    subject: string;
    name: string;
    amount: number;
    amount_as_string: string;
    booking_code: string;
    id: string;
}

class BookingEntry implements BookingEntryData {
    static property_mapping = ['date', 'subject', 'name', 'amount', 'booking_code', 'id'];

    _date: Date;
    _subject: string;
    _name: string;
    _amount: number;
    _booking_code: string;
    _id: string;

    constructor(date?: Date, subject?: string, name?: string, amount?: number, booking_code?: string, id?: string) {
        this._date = date || new Date();
        this._subject = subject || "";
        this._name = name || "";
        this._amount = amount || 0.00;
        this._booking_code = booking_code || BOOKING_CODE.NONE;
        this._id = id || BookingEntry.generate_id();
    }

    get id() {
        return this._id;
    }

    get data(): BookingEntryData {
        return {
            date_as_string: this.date_as_string,
            date: this.date,
            subject: this.subject,
            name: this.name,
            amount: this.amount,
            amount_as_string: this.amount_as_string,
            booking_code: this.booking_code,
            id: this.id
        }
    }


    get date(): Date {
        return this._date ? this._date : new Date();
    }

    set date(date) {
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
        return uuidv4();
    }

    static create_from_JSON(serialized_booking_entry: string): BookingEntry {
        let booking_entry_data = JSON.parse(serialized_booking_entry);
        return new BookingEntry(new Date(booking_entry_data._date), booking_entry_data._subject,
            booking_entry_data._name, booking_entry_data._amount, booking_entry_data._booking_code,
            booking_entry_data._id);
    }

    static create_from_data(booking_entry_data: BookingEntryData) {
        return new BookingEntry(new Date(booking_entry_data.date), booking_entry_data.subject,
            booking_entry_data.name, booking_entry_data.amount, booking_entry_data.booking_code,
            booking_entry_data.id);
    }

    get amount_as_string(): string {
        return this._amount.toFixed(2);
    }

    get date_as_string() {
        let date = this.date;
        let year = this.date.getFullYear();
        let month = this.date.getMonth() + 1;
        let day = this.date.getDate();
        //at the moment this is german-format
        return `${day}.${month}.${year}`;
    }

    toString() {
        return `${this.date_as_string}; ${this.subject}; ${this.name}; ${this.amount_as_string}; ${this.booking_code}`;
    }
}

export {BookingEntry, BookingEntryData}