"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactors = void 0;
const ReadCSVFileInteractor_1 = require("../import/read_csv_file/ReadCSVFileInteractor");
const CreateAccountInteractor_1 = require("../create/CreateAccountInteractor");
const ShowListInteractor_1 = require("../show_list/ShowListInteractor");
const DispatchBookingEntriesInteractor_1 = require("../import/dispatch_booking_entries/DispatchBookingEntriesInteractor");
const Interactors = {
    read_csv_file: ReadCSVFileInteractor_1.ReadCSVFileInteractor,
    create_account: CreateAccountInteractor_1.CreateAccountInteractor,
    show_list: ShowListInteractor_1.ShowListInteractor,
    dispatch_booking_entries: DispatchBookingEntriesInteractor_1.DispatchBookingEntriesInteractor,
};
exports.Interactors = Interactors;
module.exports = Interactors;
//# sourceMappingURL=interactors.js.map