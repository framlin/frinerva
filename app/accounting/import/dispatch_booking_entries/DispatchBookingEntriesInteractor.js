const UseCaseInteractor = require("../../../common/use_case/UseCaseInteractor");

class DispatchBookingEntriesInteractor extends UseCaseInteractor{
    execute(...data) {
        console.log("DispatchBookingEntriesInteractor", ...data)
    }
}

module.exports = DispatchBookingEntriesInteractor;