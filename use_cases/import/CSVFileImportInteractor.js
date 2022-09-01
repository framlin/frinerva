const MoneyMoneyCSVReader = require("./MoneyMoneyCSVReader");
const MoneyMoneyToBookingEntryConverter = require("./MoneyMoneyToBookingEntryConverter");
const Fs = require("fs");
const BookingEntry = require("../../account/BookingEntry");

class CSVFileImportInteractor {

    constructor(presenter) {
        this._presenter = presenter;
        this._payments = null;
        this._booking_records = null;
    }

    load_file(file_name) {
        if (file_name) {
            return Fs.createReadStream(file_name, 'utf8');
        } else {
            return new Error("FileName missing");
        }
    }

    async create_payments(file) {
        return await MoneyMoneyCSVReader.create_payments(file);
    }

    convert_payments_to_booking_records(payments) {
        let booking_records = [];
        let converter = new MoneyMoneyToBookingEntryConverter();

        for (let payment of payments) {
            let booking_record = converter.convert(payment);
            booking_records.push(booking_record);

        }
        return booking_records;
    }

    get payments() {
        return this._payments;
    }

    get booking_records() {
        return this._booking_records;
    }

    async execute_use_case(file_name) {
        let file = this.load_file(file_name);
        this._payments = await this.create_payments(file);
        this._presenter.show_payments_created(this.payments);
        this._booking_records = this.convert_payments_to_booking_records(this.payments);
        this._presenter.show_booking_records(this.booking_records, BookingEntry.property_mapping);
        return this.booking_records;
    }


}

module.exports = CSVFileImportInteractor;