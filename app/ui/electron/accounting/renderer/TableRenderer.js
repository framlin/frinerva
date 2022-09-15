class TableRenderer {

    static create_editable_table(title, rows, properties, redraw) {
        let table_div = document.createElement('DIV');
        table_div.className = "editable-table";
        table_div.innerHTML = `<DIV class="editable-table-header">${title}</DIV>`;

        let table_elem = document.createElement("TABLE");
        rows.forEach((values) => {
            TableRenderer._add_booking_entries_row(table_elem, values, properties, redraw);
        });

        table_div.appendChild(table_elem);
        return table_div;
    }


    static _add_booking_entries_row(table, values, properties, redraw) {
        let row = table.insertRow(-1);
        row.className = "editable-table-row";
        row.values = values;

        properties.forEach((prop, i) => {
            TableRenderer._insert_editable_cell(row, i, prop, values, redraw);
        });
    }

    static _insert_editable_cell(row, i, prop, buffer, redraw) {
        let {cell, text} = TableRenderer._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', (event) => {
            let input_elem = TableRenderer._make_cell_editable(cell, row);
            TableRenderer._add_event_listener(input_elem, buffer, cell, redraw);
        });
    }

    static  _add_cell(row, i, prop, buffer) {
        let cell = row.insertCell(i);
        cell.className="editable-table-cell";
        cell.prop = prop;
        let content = (prop === 'date') ?
            buffer[prop].toLocaleString('de-DE').split(',')[0] :
            buffer[prop];

        let text = document.createTextNode(content);
        return {cell, text};
    }

    static _add_event_listener(input_elem, buffer, cell, redraw) {
        input_elem.addEventListener('blur', () => {
            buffer[cell.prop] = input_elem.value;
            redraw();
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                buffer[cell.prop] = input_elem.value;
                redraw()
            }
        });
    }

    static _make_cell_editable(cell, row) {
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

module.exports = TableRenderer;