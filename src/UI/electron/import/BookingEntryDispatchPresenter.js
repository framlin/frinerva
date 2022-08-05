class BookingEntryDispatchPresenter {

    show_cost_center_list(cost_center_maps) {
        let cost_center_list = document.getElementById("cost-center-list");
        for (let year in cost_center_maps) {
            let {booking_period_div, year_div} = this._create_booking_period_and_year_div(year);
            booking_period_div.appendChild(year_div);

            for (let cost_center of cost_center_maps[year]) {
                let cost_center_div = this._create_cost_center_div(cost_center);
                booking_period_div.appendChild(cost_center_div);
            }
            cost_center_list.appendChild(booking_period_div);
        }
    }

    _create_booking_period_and_year_div(year) {
        let booking_period_div = document.createElement('div');
        booking_period_div.className = 'cost-center-list';
        let year_div = document.createElement("div");
        year_div.className = "booking-period"
        year_div.innerHTML = year;
        return {booking_period_div, year_div};
    }

    _create_cost_center_div(cost_center) {
        let div_elem = document.createElement('div');
        div_elem.className = "cost-center";
        div_elem.innerHTML = cost_center;
        return div_elem;
    }
}

module.exports = BookingEntryDispatchPresenter;