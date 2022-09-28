const TablePresenter = require("../../../../common/ui/renderer/TableRenderer");
const BookingEntry = require("../../../account/BookingEntry");

class BookingEntryDispatchRenderer {

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

        let account_list_elem = document.getElementById("account-list");
        while (account_list_elem.firstChild) {
            try {
                account_list_elem.removeChild(account_list_elem.firstChild);
            } catch (e) {
            }
        }
        let account_list = virtual_accounts[booking_period][cost_center];

        for (let account of account_list) {
            let rows = account.booking_entries;
            let account_div = TablePresenter.create_editable_table(
                `${account.name} - ${account.cost_center}`,
                rows,
                BookingEntry.property_mapping,
                () => {
                    this.show_virtual_accounts(virtual_accounts, cost_center, booking_period)
                });
            account_list_elem.appendChild(account_div);
        }
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

module.exports = BookingEntryDispatchRenderer;