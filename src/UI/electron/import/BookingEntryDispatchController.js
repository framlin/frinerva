class BookingEntryDispatchController {
    constructor(request_boundary) {
        this._request_boundary = request_boundary;
    }

    dispatch(booking_records) {
        this._request_boundary.execute_use_case(booking_records);
    }

    get virtual_accounts() {
        return this._request_boundary.virtual_accounts;
    }
}

module.exports = BookingEntryDispatchController;