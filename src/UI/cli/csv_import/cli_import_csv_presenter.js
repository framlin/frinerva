const BookingEntryPresenter = require("./booking_entry_presenter");

class CLIImportCSVPresenter {

    show_payments(payments) {
        for(let payment of payments) {
            console.log(`${payment.Datum}, ${payment.Kategorie}, ${payment.Name}, ${payment.Betrag} `)
        }
    }

    show_payments_created(payments) {
        console.log(`${payments.length} payments created`)
    }

    show_booking_entries(booking_entries) {
        console.log(`${booking_entries.length} booking_entries created`);
        let b_entries = [];
        for (let entry of booking_entries) {
            let {booking_entry} = entry;
            b_entries.push(booking_entry);
        }
        console.log(BookingEntryPresenter.present(b_entries));
    }


}

module.exports = CLIImportCSVPresenter;