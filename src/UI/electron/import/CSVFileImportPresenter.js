const BookingEntry = require("../../../accounting/account_management/BookingEntry");
const TablePresenter = require("../presenter/TablePresenter");


class CSVFileImportPresenter {

    show_payments(payments) {
        let payments_div = document.getElementById("payments");
        if (payments_div.firstChild) {
            while (payments_div.firstChild) {
                try {
                    payments_div.removeChild(payments_div.firstChild);
                } catch (e) {}
            }

        } else {
            let table = document.createElement("table");
            payments_div.appendChild(table);
            for (let payment of payments) {
                let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
                this._add_payments_row(table, values);
            }

        }
    }

    _add_payments_row(table, payments) {
        let row = table.insertRow(-1);
        payments.forEach((payment, i) => {
            let cell = row.insertCell(i);
            let text = document.createTextNode(payment);
            cell.appendChild(text);
        });
    }

    show_payments_created(payments) {
        let payment_div = document.getElementById("payments_link");
        payment_div.innerHTML = `${payments.length} payments created`;
    }


    show_booking_records(booking_records) {

        let table = document.getElementById("booking_entries");
        while (table.firstChild) {
            try {
                table.removeChild(table.firstChild);
            } catch (e) {}
        }
        booking_records.forEach((booking_record) => {
            this._add_booking_records_row(table, booking_record, () => {
                this.show_booking_records(booking_records)
            });
        });
    }

    _add_booking_records_row(table, booking_record, redraw) {
        let row = table.insertRow(-1);
        let {booking_entry} = booking_record;
        row.booking_entry = booking_entry;

        BookingEntry.property_mapping.forEach((prop, i) => {
            TablePresenter.insert_editable_cell(row, i, prop, booking_entry, redraw);
        });

        let i= 5;
        let {cost_center, year} = booking_record;
        let metadata = {cost_center, year};
        for (let prop in metadata) {
            TablePresenter.insert_editable_cell(row, i++, prop, booking_record, redraw);
        }
    }
}

module.exports = CSVFileImportPresenter;