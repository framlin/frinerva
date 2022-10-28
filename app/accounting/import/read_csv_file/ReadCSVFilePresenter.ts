import {BookingRecordData} from "../../account/BookingRecord";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";
import {MoneyMoneyPayment} from "../../account/Payment";
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {WebContents} from "electron";

let presenter: ReadCSVFilePresenter;

class ReadCSVFilePresenter extends UseCasePresenter implements ReadCSVFileResponseBoundary{
    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
        presenter = this;
    }

    show(...data: any[]) {
        //
    }

    show_payments(payments: MoneyMoneyPayment[]) {
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }


    show_booking_records(booking_records: BookingRecordData[]) {
        this._ipc_channel.send('read_csv_file:show_booking_records', booking_records);
    }

}

module.exports = {ReadCSVFilePresenter};
export {ReadCSVFilePresenter}