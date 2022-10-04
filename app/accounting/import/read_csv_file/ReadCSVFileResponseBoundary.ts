import {BookingRecord} from "../../account/BookingRecord";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";

interface ReadCSVFileResponseBoundary extends UseCaseResponseBoundary{
    show_payments(payments: any): void;
    show_booking_records(booking_records: BookingRecord[]): void;
}

export {ReadCSVFileResponseBoundary}