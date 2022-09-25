const UseCaseInteractor = require("../../../common/use_case/UseCaseInteractor");
const Accounting = require("../../account/Accounting");

class DispatchBookingEntriesInteractor extends UseCaseInteractor{
    execute(booking_records) {
        let accounting = new Accounting();
        let account_dict = this.create_account_dict(booking_records);
    }

    create_account_dict(booking_records) {
        let result = {};
        for (let booking_record of booking_records) {
            let {booking_entry, cost_center, year} = booking_record;
            let key = `${year}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            } else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }
}

module.exports = DispatchBookingEntriesInteractor;