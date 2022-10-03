const {BOOKING_CODE} = require("./BOOKING_CODE");
const { v4: uuidv4 } = require('uuid');

interface BookingEntryData {
    date: Date;
    subject: string;
    name:string;
    amount: number;
    booking_code: string;
    id: string;
}

class BookingEntry {
    static property_mapping = ['date', 'subject', 'name', 'amount', 'booking_code', 'id'];

    _date: Date;
    _subject: string;
    _name: string;
    _amount: number;
    _booking_code: string;
    _id: string;

    constructor(date: Date, subject: string, name:string, amount: number, booking_code: string, id?: string) {
        this._date = date || 0;
        this._subject = subject || "";
        this._name = name || "";
        this._amount = amount || 0.00;
        this._booking_code = booking_code || BOOKING_CODE.NONE;
        this._id = id || BookingEntry.generate_id();
    }

    get id () {
        return this._id;
    }

    get date () {
        return this._date;
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