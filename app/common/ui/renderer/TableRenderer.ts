import {BookingEntryData} from "../../../accounting/entites/BookingEntry";

type Redraw = () => void;

export class TableRenderer {

    static create_table(title: string, rows: BookingEntryData[], properties: string[], redraw: Redraw, editable: boolean = true) {
        const table_div = document.createElement('div');
        table_div.className = "editable-table";
        table_div.innerHTML = `<div class="editable-table-header">${title}</div>`;

        const table_elem = document.createElement("table") as HTMLTableElement;
        rows.forEach((values: BookingEntryData) => {
            TableRenderer._add_booking_entries_row(table_elem, values, properties, redraw, editable);
        });

        // noinspection TypeScriptValidateJSTypes
        table_div.appendChild(table_elem);
        return table_div;
    }


    static _add_booking_entries_row(table: HTMLTableElement, values: BookingEntryData, properties: string[], redraw: Redraw, editable: boolean = true) {
        const row = table.insertRow(-1);
        row.className = "editable-table-row";
        // @ts-ignore
        row.values = values;

        properties.forEach((prop, i) => {
            TableRenderer._insert_cell(row, i, prop, values, redraw, editable);
        });
    }

    static _insert_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: BookingEntryData, redraw: Redraw, editable: boolean = true) {
        const {cell, text} = TableRenderer._add_cell(row, i, prop, buffer);
        // noinspection TypeScriptValidateJSTypes
        cell.appendChild(text);
        cell.addEventListener('click', () => {
            if (editable) {
                const input_elem = TableRenderer._make_cell_editable(text, cell, row);
                TableRenderer._add_event_listener(input_elem, buffer, cell, text, redraw);
            }
        });
    }

    static  _add_cell(row: HTMLTableRowElement, i: number, prop: string, buffer: BookingEntryData) {
        const cell = row.insertCell(i);
        cell.className="editable-table-cell";
        // @ts-ignore
        cell.prop = prop;
        // @ts-ignore
        let content = buffer[prop];
        if (prop === 'date') {
            content = buffer['date_as_string']
        }

        const text = document.createTextNode(content);
        return {cell, text};
    }

    static _add_event_listener(input_elem: HTMLInputElement, buffer: BookingEntryData, cell: HTMLTableCellElement, text: Text, redraw: Redraw) {
        input_elem.addEventListener('blur', (_e) => {
            if (input_elem.value !== "") {
                // @ts-ignore
                buffer[cell.prop] = input_elem.value;
            } else {
                // @ts-ignore
                buffer[cell.prop] = text.wholeText;
            }
            redraw();
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                // @ts-ignore
                buffer[cell.prop] = input_elem.value;
                redraw();
            }
        });
    }

    static _make_cell_editable(text: Text, cell: HTMLTableCellElement, row: HTMLTableRowElement) {
        const input_elem = document.createElement("input");
        input_elem.setAttribute('type', 'text');
        input_elem.value = text.wholeText;
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

