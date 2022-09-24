const UseCase = require("../../../common/use_case/UseCase");

class DispatchBookingEntries extends UseCase{

    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'accounting', 'dispatch_booking_entries');
    }
}

module.exports = DispatchBookingEntries;