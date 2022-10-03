"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const ReadCSVFileView_1 = require("../import/read_csv_file/ui/ReadCSVFileView");
const CreateAccountView_1 = require("../create/ui/CreateAccountView");
const ShowListView_1 = require("../show_list/ui/ShowListView");
const DispatchBookingEntriesView_1 = require("../import/dispatch_booking_entries/ui/DispatchBookingEntriesView");
const Views = {
    read_csv_file: ReadCSVFileView_1.ReadCSVFileView,
    create_account: CreateAccountView_1.CreateAccountView,
    show_list: ShowListView_1.ShowListView,
    dispatch_booking_entries: DispatchBookingEntriesView_1.DispatchBookingEntriesView,
};
exports.Views = Views;
module.exports = { Views };
//# sourceMappingURL=views.js.map