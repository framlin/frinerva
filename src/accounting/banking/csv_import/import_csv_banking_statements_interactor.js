const MoneyMoneyCSVReader = require("./moneymoney_csv_reader");
const MoneyMoneyToBookingEntryConverter = require("./moneymoney_to_booking_entry_converter");
const Fs = require("fs");

class ImportCSVBankingStatementsInteractor {

    constructor(response_boundary) {
        this._csv_file_import_response_boundary = response_boundary;
        this._payments = null;
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

    convert_payments_to_booking_entries(payments) {
        let booking_entries = [];
        let converter = new MoneyMoneyToBookingEntryConverter();

        for (let payment of payments) {
            let booking_entry = converter.convert(payment);
            booking_entries.push(booking_entry);

        }
        return booking_entries;
    }

    get payments() {
        return this._payments;
    }

    async execute_use_case(file_name) {
        let file = this.load_file(file_name);
        this._payments = await this.create_payments(file);
        this._csv_file_import_response_boundary.show_payments_created(this.payments);
        // this._csv_file_import_response_boundary.show_payments(this.payments);
        let booking_entries = this.convert_payments_to_booking_entries(this.payments);
        this._csv_file_import_response_boundary.show_booking_entries(booking_entries);
        return booking_entries;
    }


}

module.exports = ImportCSVBankingStatementsInteractor;