const BookingEntry = require("../../../account/BookingEntry");

class BookingEntryPresenter {
    static present(booking_entries) {
        let result = ""
        if (booking_entries instanceof BookingEntry) {
            result += `${booking_entries.date.toLocaleString('de-DE')}; ${booking_entries.subject}; ${booking_entries.name}; ${booking_entries.amount}; ${booking_entries.booking_code}`;
        } else if (booking_entries instanceof Array) {
            for (let entry of booking_entries) {
                result += `${entry.date.toLocaleString('de-DE')}; ${entry.subject}; ${entry.name}; ${entry.amount}; ${entry.booking_code}\n`;
            }
        }
       return result;
    }
}

module.exports = BookingEntryPresenter;