class CSVFileImportPresenter {
    _view = null;

    constructor(view) {
        this._view = view;
    }

    show_payments_created(payments) {
        this._view.show_payments_created(payments);
    }

    show_booking_records(booking_records, booking_entry_property_mapping) {
        this._view.show_booking_records(booking_records, booking_entry_property_mapping);
    }
}

module.exports = CSVFileImportPresenter;