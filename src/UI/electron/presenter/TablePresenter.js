
function create_editable_table(title, rows, properties, redraw) {
    let table_div = document.createElement('DIV');
    table_div.className = "editable-table";
    table_div.innerHTML = `<DIV class="editable-table-header">${title}</DIV>`;

    let table_elem = document.createElement("TABLE");
    rows.forEach((values) => {
        _add_booking_entries_row(table_elem, values, properties, redraw);
    });

    table_div.appendChild(table_elem);
    return table_div;
}

function insert_editable_cell(row, i, prop, values, redraw) {
    let {cell, text} = _add_cell(row, i, prop, values);
    cell.appendChild(text);
    cell.addEventListener('click', (event) => {
        let input_elem = _make_cell_editable(cell, row);
        _add_event_listener(input_elem, values, cell, redraw);
    });
}

function _add_booking_entries_row(table, values, properties, redraw) {
    let row = table.insertRow(-1);
    row.className = "editable-table-row";
    row.values = values;

    properties.forEach((prop, i) => {
        insert_editable_cell(row, i, prop, values, redraw);
    });
}

function _add_cell(row, i, prop, values) {
    let cell = row.insertCell(i);
    cell.className = "editable-table-cell";
    cell.prop = prop;
    let content = (prop === 'date') ?
        values[prop].toLocaleString('de-DE').split(',')[0] :
        values[prop];

    let text = document.createTextNode(content);
    return {cell, text};
}

function _add_event_listener(input_elem, values, cell, redraw) {
    input_elem.addEventListener('blur', () => {
        values[cell.prop] = input_elem.value;
        redraw();
    });

    input_elem.addEventListener('keypress', ({key}) => {
        if (key === "Enter") {
            values[cell.prop] = input_elem.value;
            redraw()
        }
    });
}

function _make_cell_editable(cell, row) {
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


const TablePresenter = {create_editable_table, insert_editable_cell}
module.exports = TablePresenter;