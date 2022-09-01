class BookingEntryDispatchController {
    constructor(interactor) {
        this._interactor = interactor;
    }

    dispatch(booking_records) {
        this._interactor.execute_use_case(booking_records);
    }

    get virtual_accounts() {
        return this._interactor.virtual_accounts;
    }
}

module.exports = BookingEntryDispatchController;