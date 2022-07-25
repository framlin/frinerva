const BookingEntry = require("../account_management/booking_entry");

class BookingEntryPresenter {
    present(booking_entries) {
        let result = ""
        if (booking_entries instanceof BookingEntry) {
            result += `${booking_entries.date}, ${booking_entries.subject}, ${booking_entries.name}, ${booking_entries.amount}, ${booking_entries.booking_code}`;
        } else if (booking_entries instanceof Array) {
            for (let entry of booking_entries) {
                result += `${entry.date}, ${entry.subject}, ${entry.name}, ${entry.amount}, ${entry.booking_code}\n`;
            }
        }
       return result;
    }
}

module.exports = BookingEntryPresenter;