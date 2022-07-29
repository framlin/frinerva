const BookingEntryPresenter = require("../../accounting/account_presentation/booking_entry_presenter");

class CLIPaymentConversionPresenter{
    _payment_conversion_controller = null;
    constructor(payment_conversion_controller) {
        this._payment_conversion_controller = payment_conversion_controller
    }

    show(booking_entries) {
        console.log(`${booking_entries.length} booking_entries created`);
        console.log(BookingEntryPresenter.present(booking_entries));
    }

}

module.exports = CLIPaymentConversionPresenter;