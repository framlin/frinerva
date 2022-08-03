const BOOKING_CODE = require("./booking_code");

class BookingEntry {
    constructor(date, subject, name, amount, booking_code) {
        this._date = date || 0;
        this._subject = subject || "";
        this._name = name || "";
        let val = parseFloat(amount) || 0.00;
        this._amount = val.toFixed(2);
        this._booking_code = booking_code || BOOKING_CODE.NONE;
    }
    get date () {
        return this._date;
    }

    get subject() {
        return this._subject;
    }

    get name() {
        return this._name;
    }

    get amount() {
        return this._amount;
    }

    get booking_code() {
        return this._booking_code;
    }

    toString() {
        return `${this.date.toLocaleString('de-DE').split(',')[0]}; ${this.subject}; ${this.name}; ${this.amount}; ${this.booking_code}`;
    }
}
module.exports = BookingEntry;