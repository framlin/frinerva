class BookingRecord{
    _booking_entry = null;
    _cost_center = "";
    _booking_period = "";

    constructor(booking_entry, cost_center, booking_period) {
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

module.exports = BookingRecord;