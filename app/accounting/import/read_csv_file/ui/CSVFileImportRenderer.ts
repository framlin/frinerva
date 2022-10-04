import {BookingEntry} from "../../../account/BookingEntry";

class CSVFileImportRenderer {
    _active_booking_entries: any[] = [];

     show_booking_records(booking_entries: any[]) {
        this._active_booking_entries = booking_entries;

        let payments_div = document.querySelector("#payment-entries") as HTMLDivElement;
        if (payments_div.firstChild) {
            while (payments_div.firstChild) {
                try {
                    payments_div.removeChild(payments_div.firstChild);
                } catch (e) {
                }
            }
        }
        let table = document.createElement("table");
        booking_entries.forEach((entry) => {
            this._add_booking_entries_row(table, entry);
        });
        payments_div.appendChild(table);
    }

     _add_booking_entries_row(table: HTMLTableElement, booking_entry_with_cc_and_year: any) {
        let row = table.insertRow(-1);
        let {booking_entry} = booking_entry_with_cc_and_year;
        // @ts-ignore
        row.booking_record = booking_entry_with_cc_and_year;
        // @ts-ignore
        let PropertyMapping = BookingEntry.property_mapping;
        PropertyMapping.forEach((prop: string, i: number) => {
            if (prop !== 'id') {
                this._insert_editable_cell(row, i, '_' + prop, booking_entry);
            }
        });

        let i = 5;
        let {cost_center, year} = booking_entry_with_cc_and_year;
        let metadata = {cost_center, year};
        for (let prop in metadata) {
            this._insert_editable_cell(row, i++, prop, booking_entry_with_cc_and_year);
        }
    }

     _insert_editable_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: any) {
        let {cell, text} = this._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', () => {
            let input_elem = this._make_cell_editable(cell, row);
            this._add_event_listener(input_elem, buffer, cell);
        });
    }

     _add_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: any) {
        let cell = row.insertCell(i);
        // @ts-ignore
        cell.prop = prop;
        let content = (prop === '_date') ?
            buffer[prop].toLocaleString('de-DE').split(',')[0] :
            buffer[prop];

        let text = document.createTextNode(content);
        return {cell, text};
    }

     _add_event_listener(input_elem: HTMLInputElement, buffer: any, cell: HTMLTableCellElement) {
        input_elem.addEventListener('blur', () => {
            // @ts-ignore
            buffer[cell.prop] = input_elem.value;
            this.show_booking_records(this._active_booking_entries)
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                // @ts-ignore
                buffer[cell.prop] = input_elem.value;
                this.show_booking_records(this._active_booking_entries);
            }
        });
    }

     _make_cell_editable(cell: HTMLTableCellElement, row: HTMLTableRowElement) {
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

module.exports = {CSVFileImportRenderer}
export {CSVFileImportRenderer}
