const BookingEntry = require("../../../accounting/account_management/BookingEntry");

class BookingEntryDispatchPresenter {

    constructor() {
        this._active_accounts = null;
    }

    show_cost_center_list(cost_center_maps) {
        let cost_center_list = document.getElementById("cost-center-list");
        for (let year in cost_center_maps) {
            let booking_period_div = this._create_booking_period_div(year);

            for (let cost_center of cost_center_maps[year]) {
                let cost_center_div = this._create_cost_center_div(cost_center, year);
                booking_period_div.appendChild(cost_center_div);
            }
            cost_center_list.appendChild(booking_period_div);
        }
    }

    show_virtual_accounts(virtual_accounts, cost_center, booking_period) {
        this._active_accounts = {virtual_accounts, cost_center, booking_period};
        let account_list_elem = document.getElementById("account-list");
        while (account_list_elem.firstChild) {
            try {
                account_list_elem.removeChild(account_list_elem.firstChild);
            } catch (e) {}
        }
        let account_list = virtual_accounts[booking_period][cost_center];

        for (let account of account_list ) {
            let account_div = document.createElement('DIV');
            account_div.innerHTML = `<DIV class="account-header"> ${account.name} - ${account.cost_center} </DIV>`;
            account_list_elem.appendChild(account_div);

            let booking_entries = account.booking_entries;

            let account_table = document.createElement("TABLE");
            booking_entries.forEach((entry) => {
                this._add_booking_entries_row(account_table, entry);
            });

            account_div.appendChild(account_table);
        }
    }

    _add_booking_entries_row(table, booking_entry) {
        let row = table.insertRow(-1);
        row.booking_entry = booking_entry;

        BookingEntry.property_mapping.forEach((prop, i) => {
            this._insert_editable_cell(row, i, prop, booking_entry);
        });
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
            let {virtual_accounts, cost_center, booking_period} = this._active_accounts;
            this.show_virtual_accounts(virtual_accounts, cost_center, booking_period)
        });

        input_elem.addEventListener('keypress', ({key}) => {
            if (key === "Enter") {
                buffer[cell.prop] = input_elem.value;
                let {virtual_accounts, cost_center, booking_period} = this._active_accounts;
                this.show_virtual_accounts(virtual_accounts, cost_center, booking_period)
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

    _create_booking_period_div(year) {
        let booking_period_div = document.createElement('DIV');
        booking_period_div.className = 'cost-center-list';
        let year_div = document.createElement("DIV");
        year_div.className = "booking-period"
        year_div.innerHTML = year;
        booking_period_div.appendChild(year_div);
        return booking_period_div;
    }

    _create_cost_center_div(cost_center, year) {
        let div_elem = document.createElement('DIV');
        let link_elem = document.createElement('A');
        link_elem.setAttribute("href", "#");
        div_elem.className = "cost-center";
        div_elem.innerHTML = cost_center;
        div_elem.setAttribute('data-cost-center', cost_center);
        div_elem.setAttribute('data-booking-period', year);
        link_elem.appendChild(div_elem);

        link_elem.addEventListener('click', (e) => {
            window.show_virtual_accounts(e.target.dataset.costCenter, e.target.dataset.bookingPeriod);
        });
        return link_elem;
    }
}

module.exports = BookingEntryDispatchPresenter;