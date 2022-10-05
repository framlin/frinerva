"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFileInteractor = void 0;
const UseCaseInteractor_1 = require("../../../common/use_case/UseCaseInteractor");
const MoneyMoneyToBookingRecordConverter_1 = require("./util/MoneyMoneyToBookingRecordConverter");
class ReadCSVFileInteractor extends UseCaseInteractor_1.UseCaseInteractor {
    constructor() {
        super(...arguments);
        this._payments = [];
        this._booking_records = [];
    }
    async execute(file_name) {
        if (file_name) {
            let file = this.helper.load_file(file_name);
            this._payments = await this.helper.create_payments(file);
            this.response_boundary.show_payments(this._payments);
        }
        else {
            console.log("ReadCSVFileInteractor: FILENAME MISSING");
        }
    }
    create_booking_entries() {
        this._booking_records = this.convert_payments_to_booking_records(this._payments);
        this.response_boundary.show_booking_records(this._booking_records);
    }
    convert_payments_to_booking_records(payments) {
        let booking_records = [];
        let converter = new MoneyMoneyToBookingRecordConverter_1.MoneyMoneyToBookingRecordConverter();
        for (let payment of payments) {
            let booking_record = converter.convert(payment);
            booking_records.push(booking_record);
        }
        return booking_records;
    }
    get helper() {
        return this._helper;
    }
    get response_boundary() {
        return this._response_boundary;
    }
    set helper(value) {
        this._helper = value;
    }
    set response_boundary(value) {
        this._response_boundary = value;
    }
}
exports.ReadCSVFileInteractor = ReadCSVFileInteractor;
module.exports = { ReadCSVFileInteractor };
//# sourceMappingURL=ReadCSVFileInteractor.js.map