class BookingEntryDispatchInteractor {
    constructor(response_boundary){
        this._response_boundary = response_boundary;
    }

    _extract_cost_center(booking_records) {
        let cost_center_sets = {}

        for(let {cost_center, year} of booking_records) {
            if (!cost_center_sets[year]) {
                cost_center_sets[year] = new Set();
            }
            cost_center_sets[year].add(cost_center);
        }

        return cost_center_sets;
    }

    async execute_use_case(booking_records) {
        let cost_center_set = this._extract_cost_center(booking_records);
        this._response_boundary.show_cost_center_list(cost_center_set);
    }

}

module.exports = BookingEntryDispatchInteractor;