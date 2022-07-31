const MoneyMoneyCSVReader = require("./moneymoney_csv_reader");
const MoneyMoneyToBookingEntryConverter = require("./moneymoney_to_booking_entry_converter");
const Fs = require("fs");

class ImportCSVBankingStatementsInteractor {

    constructor(response_boundary) {
        this._csv_file_import_response_boundary = response_boundary;
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
            booking_entries.push(converter.convert(payment));
        }
        return booking_entries;
    }

    async execute_use_case(file_name) {
        let file = this.load_file(file_name);
        let payments = await this.create_payments(file);
        this._csv_file_import_response_boundary.show_payments_created(payments);
        this._csv_file_import_response_boundary.show_payments(payments);
        let booking_entries = this.convert_payments_to_booking_entries(payments);
        this._csv_file_import_response_boundary.show_booking_entries(booking_entries);
        return booking_entries;
    }


}

module.exports = ImportCSVBankingStatementsInteractor;