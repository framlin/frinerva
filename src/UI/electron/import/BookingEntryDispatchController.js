class BookingEntryDispatchController {
    constructor(request_boundary) {
        this._request_boundary = request_boundary;
    }

    dispatch(booking_records) {
        this._request_boundary.execute_use_case(booking_records);
    }
}

module.exports = BookingEntryDispatchController;