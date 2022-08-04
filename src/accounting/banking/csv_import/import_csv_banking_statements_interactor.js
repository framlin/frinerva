const MoneyMoneyCSVReader = require("./moneymoney_csv_reader");
const MoneyMoneyToBookingEntryConverter = require("./moneymoney_to_booking_entry_converter");
const Fs = require("fs");

class ImportCSVBankingStatementsInteractor {

    constructor(response_boundary) {
        this._csv_file_import_response_boundary = response_boundary;
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

    convert_payments_to_booking_entries(payments) {
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

    get booking_entries() {
        return this._booking_records;
    }

    async execute_use_case(file_name) {
        let file = this.load_file(file_name);
        this._payments = await this.create_payments(file);
        this._csv_file_import_response_boundary.show_payments_created(this.payments);
        this._booking_records = this.convert_payments_to_booking_entries(this.payments);
        this._csv_file_import_response_boundary.show_booking_entries(this.booking_entries);
        return this.booking_entries;
    }


}

module.exports = ImportCSVBankingStatementsInteractor;