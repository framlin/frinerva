const BookingEntryPresenter = require("../../cli/csv_import/booking_entry_presenter");

class CSVFileImportPresenter {


    show_payments(payments) {
        let table = document.getElementById("payments");
        for (let payment of payments) {
            let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
            this.add_row(table, values);
        }
    }

    show_payments_created(payments) {
        console.log(`${payments.length} payments created`)
    }

    show_booking_entries(booking_entries) {
        let table = document.getElementById("booking_entries");
        for (let {booking_entry} of booking_entries) {
            let entry_string = booking_entry.toString();
            let fields = entry_string.split(";");
            this.add_row(table, fields);
        }
    }


    add_row(table, entries) {
        let i = 0;
        let row = table.insertRow(-1);
        for (let entry of entries) {
            let cell = row.insertCell(i++);
            let text = document.createTextNode(entry);
            cell.appendChild(text);
        }
    }
}

module.exports = CSVFileImportPresenter;