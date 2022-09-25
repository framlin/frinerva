const UseCaseInteractor = require("../../../common/use_case/UseCaseInteractor");
const Accounting = require("../../account/Accounting");

class DispatchBookingEntriesInteractor extends UseCaseInteractor{
    execute(booking_records) {
        let accounting = new Accounting();
        let account_map = this.create_account_dict(booking_records);
    }

    create_account_dict(booking_records) {
        let result = {};
        if (booking_records.length > 0 ) {
            let {booking_entry, cost_center, year} = booking_records[0];
            result[`${year}!${cost_center}`] = booking_entry;
        }
        return result;
    }
}

module.exports = DispatchBookingEntriesInteractor;