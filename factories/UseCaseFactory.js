const CSVFileImportPresenter = require("../use_cases/import/CSVFileImportPresenter");
const CSVFileImportDisplay = require("../ui/electron/import/CSVFileImportDisplay");
const CSVFileImportInteractor = require("../use_cases/import/CSVFileImportInteractor");
const CSVFileImportController = require("../use_cases/import/CSVFileImportController");
const BookingEntryDispatchDisplay = require("../ui/electron/import/BookingEntryDispatchDisplay");
const BookingEntryDispatchPresenter = require("../use_cases/import/BookingEntryDispatchPresenter");
const BookingEntryDispatchInteractor = require("../use_cases/import/BookingEntryDispatchInteractor");
const BockingEntryDispatchController = require("../use_cases/import/BookingEntryDispatchController");


let CSV_FILE_IMPORT;
let BOOKING_ENTRY_DISPATCH;

const use_cases = {
    cvs_file_import: (name) => {
        if (!CSV_FILE_IMPORT) {
            const view = new CSVFileImportDisplay();
            const presenter = new CSVFileImportPresenter(view)
            const interactor =  new CSVFileImportInteractor(presenter);
            const controller = new CSVFileImportController(interactor);
            const use_case = {
                name, view, presenter, interactor, controller
            };
            CSV_FILE_IMPORT = use_case;
        }
        return CSV_FILE_IMPORT
    },

    booking_entry_dispatch: (name) => {
        if (!BOOKING_ENTRY_DISPATCH) {
            const view = new BookingEntryDispatchDisplay();
            const presenter = new BookingEntryDispatchPresenter(view);
            const interactor = new BookingEntryDispatchInteractor(presenter);
            const controller = new BockingEntryDispatchController(interactor);
            const use_case = {
                name, view, presenter, interactor, controller
            };
            BOOKING_ENTRY_DISPATCH = use_case;

        }
        return BOOKING_ENTRY_DISPATCH;
    }
}

class UseCaseFactory{
    static create(use_case_name) {
        return use_cases[use_case_name](use_case_name);
    }
}


module.exports = UseCaseFactory;