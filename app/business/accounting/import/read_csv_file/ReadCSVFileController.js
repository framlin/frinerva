const UseCaseController = require("../../../use_case/UseCaseController");
const {dialog} = require("electron");

class ReadCSVFileController extends UseCaseController {
    _current_state;

    async execute() {
        const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
        if (canceled) {
            this._interactor.execute(null);
        } else {
            this._interactor.execute(filePaths[0]);
        }
        this._current_state = "START"
    }

    next() {
        switch (this._current_state) {
            case "START":
                this._interactor.create_booking_entries();
                this._current_state = "BOOKING_ENTRY_CREATION";
                break;
        }

    }

}

module.exports = ReadCSVFileController;