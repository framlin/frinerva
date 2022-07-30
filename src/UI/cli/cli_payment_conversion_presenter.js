const BookingEntryPresenter = require("../../accounting/account_presentation/booking_entry_presenter");

class CLIPaymentConversionPresenter{
    show(booking_entries) {
        console.log(`${booking_entries.length} booking_entries created`);
        console.log(BookingEntryPresenter.present(booking_entries));
    }

}

module.exports = CLIPaymentConversionPresenter;