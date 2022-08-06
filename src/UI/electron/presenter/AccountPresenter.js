const BookingEntry = require("../../../accounting/account_management/BookingEntry");

class AccountPresenter {
    static create_editable_table(account, presentation) {

        return AccountPresenter._create_editable_table(account, presentation);
    }

    static _create_editable_table(account, presentation) {
        let account_div = document.createElement('DIV');
        account_div.className = "account";
        account_div.innerHTML = `<DIV class="account-header"> ${account.name} - ${account.cost_center} </DIV>`;

        let booking_entries = account.booking_entries;

        let account_table = document.createElement("TABLE");
        booking_entries.forEach((entry) => {
            AccountPresenter._add_booking_entries_row(account_table, entry, presentation);
        });

        account_div.appendChild(account_table);
        return account_div;
    }

    static _add_booking_entries_row(table, booking_entry, presentation) {
        let row = table.insertRow(-1);
        row.booking_entry = booking_entry;

        BookingEntry.property_mapping.forEach((prop, i) => {
            AccountPresenter._insert_editable_cell(row, i, prop, booking_entry, presentation);
        });
    }

    static _insert_editable_cell(row, i, prop, buffer, presentation) {
        let {cell, text} = AccountPresenter._add_cell(row, i, prop, buffer);
        cell.appendChild(text);
        cell.addEventListener('click', (event) => {
            let input_elem = AccountPresenter._make_cell_editable(cell, row);
            AccountPresenter._add_event_listener(input_elem, buffer, cell, presentation);
        });
    }

    static  _add_cell(row, i, prop, buffer) {
        let cell = row.insertCell(i);
        cell.prop = prop;
        let content = (prop === 'date') ?
            buffer[prop].toLocaleString('de-DE').split(',')[0] :
            buffer[prop];

        let text = document.createTextNode(content);
        return {cell, text};
    }

    static _add_event_listener(input_elem, buffer, cell, presentation) {
        input_elem.addEventListener('blur', () => {
            buffer[cell.prop] = input_elem.value;
            let {virtual_accounts, cost_center, booking_period} = presentation;
            presentation.present(virtual_accounts, cost_center, booking_period)
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                buffer[cell.prop] = input_elem.value;
                let {virtual_accounts, cost_center, booking_period} = presentation;
                presentation.present(virtual_accounts, cost_center, booking_period)
            }
        });
    }

    static _make_cell_editable(cell, row) {
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

module.exports = AccountPresenter;