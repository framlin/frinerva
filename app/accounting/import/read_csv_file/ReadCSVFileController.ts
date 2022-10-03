import {BookingEntry} from "../../account/BookingEntry";

import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {ReadCSVFileInteractor} from "./ReadCSVFileInteractor";

class ReadCSVFileController extends UseCaseController {
    _current_state: string = "";


    async execute(file_path: string) {
        if (this._interactor) {
            this._interactor.execute(file_path);
            this._current_state = "START"
        }
    }

    next(booking_entries: BookingEntry[]) {
        switch (this._current_state) {
            case "START":
                if (this._interactor) {
                    (this._interactor as unknown as ReadCSVFileInteractor).create_booking_entries();
                    this._current_state = "BOOKING_ENTRY_CREATION";
                }
                break;
            case "BOOKING_ENTRY_CREATION":
                this.forward('dispatch_booking_entries', booking_entries);
                this._current_state = "START"
        }

    }

}

module.exports = {ReadCSVFileController};
export {ReadCSVFileController}
