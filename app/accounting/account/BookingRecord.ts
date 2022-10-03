import {BookingEntry} from "./BookingEntry";

class BookingRecord{
    _booking_entry: BookingEntry;
    _cost_center : string= "";
    _booking_period: string = "";

    constructor(booking_entry: BookingEntry, cost_center: string, booking_period: string) {
        this._booking_entry = booking_entry;
        this._cost_center = cost_center;
        this._booking_period = booking_period;
    }

    get cost_center() {
        return this._cost_center;
    }

    get booking_period() {
        return this._booking_period;
    }

    get booking_entry() {
        return this._booking_entry;
    }
}

module.exports = {BookingRecord};
export {BookingRecord}