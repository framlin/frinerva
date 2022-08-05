class BookingEntryDispatchPresenter {

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
        div_elem.setAttribute('data-year', year);
        link_elem.appendChild(div_elem);
        return link_elem;
    }
}

module.exports = BookingEntryDispatchPresenter;