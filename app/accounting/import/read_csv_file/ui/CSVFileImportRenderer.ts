import {BookingEntry, BookingEntryData} from "../../../account/BookingEntry";
import {BookingRecordData} from "../../../account/BookingRecord";

type BookingData = BookingRecordData|BookingEntryData;

class CSVFileImportRenderer {

    _active_booking_entries: BookingRecordData[] = [];

     show_booking_records(booking_entries: BookingRecordData[]) {
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

     _add_booking_entries_row(table: HTMLTableElement, booking_record: BookingRecordData) {
        let row = table.insertRow(-1);
        let {booking_entry} = booking_record;
        // @ts-ignore
        row.booking_record = booking_record;
        let property_mapping = BookingEntry.property_mapping;
        property_mapping.forEach((prop: string, i: number) => {
            if (prop !== 'id') {
                this._insert_editable_cell(row, i, prop, booking_entry);
            }
        });

        let i = 5;
        let {cost_center, booking_period} = booking_record;
        let metadata = {cost_center, booking_period};
        for (let prop in metadata) {
            this._insert_editable_cell(row, i++, prop, booking_record);
        }
    }

     _insert_editable_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: BookingData) {
        let {cell, text} = this._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', () => {
            let input_elem = this._make_cell_editable(cell, row);
            this._add_event_listener(input_elem, buffer, cell);
        });
    }

     _add_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: BookingData) {
        let cell = row.insertCell(i);
        // @ts-ignore
        cell.prop = prop;

        // @ts-ignore
         let content = (prop === 'date') ?
             // @ts-ignore
            buffer[prop].toLocaleString('de-DE').split(',')[0] : buffer[prop];

        let text = document.createTextNode(content);
        return {cell, text};
    }

     _add_event_listener(input_elem: HTMLInputElement, buffer: BookingData, cell: HTMLTableCellElement) {
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
