const BookingEntry = require("../../../accounting/account_management/BookingEntry");


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

    show_booking_entries(booking_entries) {
        this._active_booking_entries = booking_entries;

        let table = document.getElementById("booking_entries");
        while (table.firstChild) {
            try {
                table.removeChild(table.firstChild);
            } catch (e) {}
        }
        booking_entries.forEach((entry) => {
            this._add_booking_entries_row(table, entry);
        });
    }

    _add_booking_entries_row(table, booking_entry_with_cc_and_year) {
        let row = table.insertRow(-1);
        let {booking_entry} = booking_entry_with_cc_and_year;
        row.booking_entry = booking_entry;

        BookingEntry.property_mapping.forEach((prop, i) => {
            this._insert_editable_cell(row, i, prop, booking_entry);
        });

        let i= 5;
        let {cost_center, year} = booking_entry_with_cc_and_year;
        let metadata = {cost_center, year};
        for (let prop in metadata) {
            this._insert_editable_cell(row, i++, prop, booking_entry_with_cc_and_year);
        }
    }

    _insert_editable_cell(row, i, prop, buffer) {
        let {cell, text} = this._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', (event) => {
            let input_elem = this._make_cell_editable(cell, row);
            this._add_event_listener(input_elem, buffer, cell);
        });
    }

    _add_cell(row, i, prop, buffer) {
        let cell = row.insertCell(i);
        cell.prop = prop;
        let content = (prop === 'date') ?
            buffer[prop].toLocaleString('de-DE').split(',')[0] :
            buffer[prop];

        let text = document.createTextNode(content);
        return {cell, text};
    }

    _add_event_listener(input_elem, buffer, cell) {
        input_elem.addEventListener('blur', () => {
            buffer[cell.prop] = input_elem.value;
            this.show_booking_entries(this._active_booking_entries)
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                buffer[cell.prop] = input_elem.value;
                this.show_booking_entries(this._active_booking_entries);
            }
        });
    }

    _make_cell_editable(cell, row) {
        let elem_replaced = false;
        let input_elem = document.createElement("input");
        input_elem.setAttribute('type', 'text');
        cell.style.padding = "0px";
        cell.style.margin = "0px";
        cell.style.border = "0px";
        input_elem.style.position = "relative";
        input_elem.style.height = cell.offsetHeight + "px";
        input_elem.style.width = cell.offsetWidth + "px";
        input_elem.style.background = "white";
        input_elem.style.padding = '0px';
        input_elem.style.margin = "0px";
        input_elem.style.border = "0px";

        row.replaceChild(input_elem, cell);
        input_elem.focus();
        return input_elem;
    }
}

module.exports = CSVFileImportPresenter;