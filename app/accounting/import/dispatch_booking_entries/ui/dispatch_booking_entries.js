window["accounting__dispatch_booking_entries"].show_virtual_accounts((virtual_accounts) => {
    let virtual_account_list_elem = document.getElementById("virtual-account-list");
    while (virtual_account_list_elem.firstChild) {
        try {
            virtual_account_list_elem.removeChild(virtual_account_list_elem.firstChild);
        } catch (e) {
        }
    }

    for (let virtual_account of virtual_accounts) {
        show_virtual_account(virtual_account);
    }
});


window["accounting__dispatch_booking_entries"].register_event_listener((virtual_accounts) => {
    console.log("NEXT_BUTTON not implemented yet")
});


function show_virtual_account(virtual_account){

   // let create_editable_table = window["accounting__dispatch_booking_entries"].create_editable_table;
    let virtual_account_list_elem = document.getElementById("virtual-account-list");
    let property_mapping = window["accounting__dispatch_booking_entries"].get_property_mapping();
    let account_div = _create_editable_table_(
        `${virtual_account.booking_period} - ${virtual_account.cost_center}`,
        virtual_account.booking_entries,
        property_mapping,
        () => {
            show_virtual_account(virtual_account);
        });
    virtual_account_list_elem.appendChild(account_div);
}


//===================================
function  _create_editable_table_(title, rows, properties, redraw) {
    let table_div = document.createElement('DIV');
    table_div.className = "editable-table";
    table_div.innerHTML = `<DIV class="editable-table-header">${title}</DIV>`;

    let table_elem = document.createElement("TABLE");
    rows.forEach((values) => {
        _add_booking_entries_row_(table_elem, values, properties, redraw);
    });

    table_div.appendChild(table_elem);
    return table_div;
}


function _add_booking_entries_row_(table, values, properties, redraw) {
    let row = table.insertRow(-1);
    row.className = "editable-table-row";
    row.values = values;

    properties.forEach((prop, i) => {
        _insert_editable_cell_(row, i, prop, values, redraw);
    });
}

function _insert_editable_cell_(row, i, prop, buffer, redraw) {
    let {cell, text} = _add_cell_(row, i, prop, buffer);
    cell.appendChild(text);
    cell.addEventListener('click', (event) => {
        let input_elem = _make_cell_editable_(cell, row);
        _add_event_listener_(input_elem, buffer, cell, redraw);
    });
}

function  _add_cell_(row, i, prop, buffer) {
    let cell = row.insertCell(i);
    cell.className="editable-table-cell";
    cell.prop = prop;
    let content = (prop === 'date') ?
        buffer[prop].toLocaleString('de-DE').split(',')[0] :
        buffer[prop];

    let text = document.createTextNode(content);
    return {cell, text};
}

function _add_event_listener_(input_elem, buffer, cell, redraw) {
    input_elem.addEventListener('blur', () => {
        buffer[cell.prop] = input_elem.value;
        redraw();
    });

    input_elem.addEventListener('keypress', ({key}) => {
        if (key === "Enter") {
            buffer[cell.prop] = input_elem.value;
            redraw();
        }
    });
}

function _make_cell_editable_(cell, row) {
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
