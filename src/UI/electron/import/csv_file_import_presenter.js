const BookingEntry = require("../../../accounting/account_management/booking_entry");


class CSVFileImportPresenter {


    show_payments(payments) {
        // let table = document.getElementById("payments");
        // for (let payment of payments) {
        //     let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
        //     this.add_row(table, values);
        // }
    }

    show_payments_created(payments) {
        let payment_div = document.getElementById("payments");
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
        booking_entries.forEach(({booking_entry, cost_center, year}, index) => {
            let entry_string = booking_entry.toString();
            let fields = entry_string.split(";");
            fields.push(cost_center);
            fields.push(year);
            this.add_row(table, booking_entry);
        });
    }


    add_row(table, booking_entry) {
        let i = 0;
        let row = table.insertRow(-1);
        row.booking_entry = booking_entry;

        BookingEntry.property_mapping.forEach((prop, i) => {
            let cell = row.insertCell(i);
            cell.prop = prop;
            let content = (prop === 'date') ?
                booking_entry[prop].toLocaleString('de-DE').split(',')[0] :
                booking_entry[prop];

            let text = document.createTextNode(content);


            cell.appendChild(text);
            cell.addEventListener('click', (event) => {
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
                // input_elem.style.top = -Math.abs(cell.offsetHeight) + 'px';


                row.replaceChild(input_elem, cell);
                input_elem.focus();


                input_elem.addEventListener('blur', () => {
                    booking_entry[cell.prop] = input_elem.value;
                    this.show_booking_entries(this._active_booking_entries)
                });

                input_elem.addEventListener('keypress', ({key}) => {
                    if (key === "Enter") {
                        booking_entry[cell.prop] = input_elem.value;
                        this.show_booking_entries(this._active_booking_entries);
                    }
                });


            });
        });
    }


}

module.exports = CSVFileImportPresenter;