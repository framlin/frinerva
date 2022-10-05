import {BookingRecordData} from "../../account/BookingRecord";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {MoneyMoneyPayment} from "../../account/Payment";

interface ReadCSVFileResponseBoundary extends UseCaseResponseBoundary{
    show_payments(payments: MoneyMoneyPayment[]): void;
    show_booking_records(booking_records: BookingRecordData[]): void;
}

export {ReadCSVFileResponseBoundary}