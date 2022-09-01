class BookingEntryDispatchPresenter{
    _view = null;

    constructor(view) {
        this._view = view;
    }

    dispatch_commited() {
        console.log("PRESENTER => DOSPATCH:COMMITED")
    }

    show_cost_center_list(cost_center_set, booking_entry_property_mapping){
        this._view.show_cost_center_list(cost_center_set, booking_entry_property_mapping);
    }
}

module.exports = BookingEntryDispatchPresenter;