"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFileController = void 0;
const UseCaseController_1 = require("../../../common/use_case/UseCaseController");
class ReadCSVFileController extends UseCaseController_1.UseCaseController {
    constructor() {
        super(...arguments);
        this._current_state = "";
    }
    async execute(file_path) {
        if (this._interactor) {
            this._interactor.execute(file_path);
            this._current_state = "START";
        }
    }
    next(booking_entries) {
        switch (this._current_state) {
            case "START":
                if (this._interactor) {
                    this._interactor.create_booking_entries();
                    this._current_state = "BOOKING_ENTRY_CREATION";
                }
                break;
            case "BOOKING_ENTRY_CREATION":
                this.forward('dispatch_booking_entries', booking_entries);
                this._current_state = "START";
        }
    }
}
exports.ReadCSVFileController = ReadCSVFileController;
module.exports = { ReadCSVFileController };
//# sourceMappingURL=ReadCSVFileController.js.map