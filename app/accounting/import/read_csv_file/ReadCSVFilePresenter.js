"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFilePresenter = void 0;
const UseCasePresenter_1 = require("../../../common/use_case/UseCasePresenter");
let presenter;
class ReadCSVFilePresenter extends UseCasePresenter_1.UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }
    show(...data) {
        //
    }
    show_payments(payments) {
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }
    show_booking_records(booking_records) {
        this._ipc_channel.send('read_csv_file:show_booking_records', booking_records);
    }
}
exports.ReadCSVFilePresenter = ReadCSVFilePresenter;
module.exports = { ReadCSVFilePresenter };
//# sourceMappingURL=ReadCSVFilePresenter.js.map