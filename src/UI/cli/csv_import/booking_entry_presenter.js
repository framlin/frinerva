const BookingEntry = require("../../../accounting/account_management/booking_entry");

class BookingEntryPresenter {
    static present(booking_entries) {
        let result = ""
        if (booking_entries instanceof BookingEntry) {
            result += `${booking_entries.date.toLocaleString('de-DE')}; ${booking_entries.subject}; ${booking_entries.name}; ${booking_entries.amount}; ${booking_entries.booking_code}`;
        } else if (booking_entries instanceof Array) {
            for (let entry of booking_entries) {
                let {booking_entry} = entry;
                result += `${booking_entry.date.toLocaleString('de-DE')}; ${booking_entry.subject}; ${booking_entry.name}; ${booking_entry.amount}; ${booking_entry.booking_code}\n`;
            }
        }
       return result;
    }
}

module.exports = BookingEntryPresenter;