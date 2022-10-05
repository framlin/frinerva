import {BookingRecord, BookingRecordData} from "../../account/BookingRecord";
import {MoneyMoneyPayment} from "../../account/Payment";

import {UseCaseInteractor} from "../../../common/use_case/UseCaseInteractor";
import {MoneyMoneyToBookingRecordConverter} from "./util/MoneyMoneyToBookingRecordConverter";
import {ReadCSVFileHelper} from "./ReadCSVFileHelper";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";

class ReadCSVFileInteractor extends UseCaseInteractor {
    async execute(file_name: string) {
        if (file_name) {
            let file = this.helper.load_file(file_name);
            this._payments = await this.helper.create_payments(file);
            this.response_boundary.show_payments(this._payments);
        } else {
            console.log("ReadCSVFileInteractor: FILENAME MISSING");
        }
    }

    create_booking_entries() {
        this._booking_records = this.convert_payments_to_booking_records(this._payments);
        this.response_boundary.show_booking_records(this._booking_records);
    }

    convert_payments_to_booking_records(payments: MoneyMoneyPayment[]): BookingRecordData[] {
        let booking_records: BookingRecordData[] = [];
        let converter = new MoneyMoneyToBookingRecordConverter();

        for (let payment of payments) {
            let booking_record = converter.convert(payment);
            booking_records.push(booking_record);
        }
        return booking_records;
    }

    get helper(): ReadCSVFileHelper {
        return this._helper as ReadCSVFileHelper;
    }

    get response_boundary(): ReadCSVFileResponseBoundary {
        return this._response_boundary as ReadCSVFileResponseBoundary;
    }

    set helper(value) {
        this._helper = value;
    }

    set response_boundary(value) {
        this._response_boundary = value;
    }


    private _payments: MoneyMoneyPayment[] = [];
    private _booking_records: BookingRecordData[] = [];

}

module.exports = {ReadCSVFileInteractor};
export {ReadCSVFileInteractor}
