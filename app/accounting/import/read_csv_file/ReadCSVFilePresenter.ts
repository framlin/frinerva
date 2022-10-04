import {BookingRecord} from "../../account/BookingRecord";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";

const {UseCasePresenter} = require("../../../common/use_case/UseCasePresenter");

let presenter: ReadCSVFilePresenter;

class ReadCSVFilePresenter extends UseCasePresenter implements ReadCSVFileResponseBoundary{
    constructor(ipc_chanel: any) {
        super(ipc_chanel);
        presenter = this;
    }

    show(...data: any[]) {
        //
    }

    show_payments(payments: any) {
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }


    show_booking_records(booking_records: BookingRecord[]) {
        this._ipc_channel.send('read_csv_file:show_booking_records', booking_records);
    }

}

module.exports = {ReadCSVFilePresenter};
export {ReadCSVFilePresenter}