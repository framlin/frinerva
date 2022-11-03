import {UseCaseResponseBoundary} from "../../../../common/use_case/UseCaseResponseBoundary";
import {BookingRecordData} from "../../../entites/BookingRecord";
import {MoneyMoneyPayment} from "../../../entites/Payment";

export interface ReadCSVFileResponseBoundary extends UseCaseResponseBoundary{
    show_payments(payments: MoneyMoneyPayment[]): void;
    show_booking_records(booking_records: BookingRecordData[]): void;
}
