const UseCaseController = require("../../../common/use_case/UseCaseController");

class ReadCSVFileController extends UseCaseController {
    _current_state;

    async execute(file_path) {
        this._interactor.execute(file_path);
        this._current_state = "START"
    }

    next(booking_entries) {
        switch (this._current_state) {
            case "START":
                this._interactor.create_booking_entries();
                this._current_state = "BOOKING_ENTRY_CREATION";
                break;
            case "BOOKING_ENTRY_CREATION":
                this.forward('dispatch_booking_entries', booking_entries);
                this._current_state = "START"
        }

    }

}

module.exports = ReadCSVFileController;