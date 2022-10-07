"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRenderer = void 0;
class TableRenderer {
    static create_editable_table(title, rows, properties, redraw) {
        let table_div = document.createElement('div');
        table_div.className = "editable-table";
        table_div.innerHTML = `<DIV class="editable-table-header">${title}</DIV>`;
        let table_elem = document.createElement("table");
        rows.forEach((values) => {
            TableRenderer._add_booking_entries_row(table_elem, values, properties, redraw);
        });
        table_div.appendChild(table_elem);
        return table_div;
    }
    static _add_booking_entries_row(table, values, properties, redraw) {
        let row = table.insertRow(-1);
        row.className = "editable-table-row";
        // @ts-ignore
        row.values = values;
        properties.forEach((prop, i) => {
            TableRenderer._insert_editable_cell(row, i, prop, values, redraw);
        });
    }
    static _insert_editable_cell(row, i, prop, buffer, redraw) {
        let { cell, text } = TableRenderer._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', () => {
            let input_elem = TableRenderer._make_cell_editable(text, cell, row);
            TableRenderer._add_event_listener(input_elem, buffer, cell, text, redraw);
        });
    }
    static _add_cell(row, i, prop, buffer) {
        let cell = row.insertCell(i);
        cell.className = "editable-table-cell";
        // @ts-ignore
        cell.prop = prop;
        // @ts-ignore
        let content = buffer[prop];
        let text = document.createTextNode(content);
        return { cell, text };
    }
    static _add_event_listener(input_elem, buffer, cell, text, redraw) {
        input_elem.addEventListener('blur', (_e) => {
            if (input_elem.value !== "") {
                // @ts-ignore
                buffer[cell.prop] = input_elem.value;
            }
            else {
                // @ts-ignore
                buffer[cell.prop] = text.wholeText;
            }
            redraw();
        });
        input_elem.addEventListener('keypress', ({ key }) => {
            if (key === "Enter") {
                // @ts-ignore
                buffer[cell.prop] = input_elem.value;
                redraw();
            }
        });
    }
    static _make_cell_editable(text, cell, row) {
        let input_elem = document.createElement("input");
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
exports.TableRenderer = TableRenderer;
module.exports = { TableRenderer };
//# sourceMappingURL=TableRenderer.js.map