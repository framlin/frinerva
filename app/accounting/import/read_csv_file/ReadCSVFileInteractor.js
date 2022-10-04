"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFileInteractor = void 0;
const { UseCaseInteractor } = require("../../../common/use_case/UseCaseInteractor");
const { MoneyMoneyToBookingRecordConverter } = require("./util/MoneyMoneyToBookingRecordConverter");
class ReadCSVFileInteractor extends UseCaseInteractor {
    constructor() {
        super(...arguments);
        this._payments = [];
        this._booking_records = [];
    }
    async execute(file_name) {
        if (file_name) {
            let file = this._helper.load_file(file_name);
            this._payments = await this._helper.create_payments(file);
            this._response_boundary.show_payments(this._payments);
        }
        else {
            console.log("ReadCSVFileInteractor: FILENAME MISSING");
        }
    }
    create_booking_entries() {
        this._booking_records = this.convert_payments_to_booking_records(this._payments);
        this._response_boundary.show_booking_records(this._booking_records);
    }
    convert_payments_to_booking_records(payments) {
        let booking_records = [];
        let converter = new MoneyMoneyToBookingRecordConverter();
        for (let payment of payments) {
            let booking_record = converter.convert(payment);
            booking_records.push(booking_record);
        }
        return booking_records;
    }
}
exports.ReadCSVFileInteractor = ReadCSVFileInteractor;
module.exports = { ReadCSVFileInteractor };
//# sourceMappingURL=ReadCSVFileInteractor.js.map