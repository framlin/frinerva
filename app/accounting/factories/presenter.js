"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presenter = void 0;
const ReadCSVFilePresenter_1 = require("../import/read_csv_file/ReadCSVFilePresenter");
const CreateAccountPresenter_1 = require("../create/CreateAccountPresenter");
const ShowListPresenter_1 = require("../show_list/ShowListPresenter");
const DispatchBookingEntriesPresenter_1 = require("../import/dispatch_booking_entries/DispatchBookingEntriesPresenter");
const Presenter = {
    read_csv_file: ReadCSVFilePresenter_1.ReadCSVFilePresenter,
    create_account: CreateAccountPresenter_1.CreateAccountPresenter,
    show_list: ShowListPresenter_1.ShowListPresenter,
    dispatch_booking_entries: DispatchBookingEntriesPresenter_1.DispatchBookingEntriesPresenter,
};
exports.Presenter = Presenter;
module.exports = { Presenter };
//# sourceMappingURL=presenter.js.map