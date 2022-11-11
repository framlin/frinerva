import {UseCasePresenter} from "../../../../common/usecase/UseCasePresenter";
import {BookingRecordData} from "../../../entites/BookingRecord";
import {MoneyMoneyPayment} from "../../../entites/Payment";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";

export class ReadCSVFilePresenter extends UseCasePresenter implements ReadCSVFileResponseBoundary {

    show_payments(payments: MoneyMoneyPayment[]) {
        this._response_channel.send('read_csv_file:show_payments', payments);
    }

    show_booking_records(booking_records: BookingRecordData[]) {
        this._response_channel.send('read_csv_file:show_booking_records', booking_records);
    }

    show(...data: unknown[]): void {
    }
}
