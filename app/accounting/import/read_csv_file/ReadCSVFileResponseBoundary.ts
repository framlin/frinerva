import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {BookingRecordData} from "../../account/BookingRecord";
import {MoneyMoneyPayment} from "../../account/Payment";

export interface ReadCSVFileResponseBoundary extends UseCaseResponseBoundary{
    show_payments(payments: MoneyMoneyPayment[]): void;
    show_booking_records(booking_records: BookingRecordData[]): void;
}
