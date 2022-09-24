const UseCasePresenter = require("../../../common/use_case/UseCasePresenter");
let presenter;

class DispatchBookingEntriesPresenter extends UseCasePresenter {

    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }
}
module.exports = DispatchBookingEntriesPresenter;