"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ReadCSVFileController_1 = require("../import/read_csv_file/ReadCSVFileController");
const CreateAccountController_1 = require("../create/CreateAccountController");
const ShowListController_1 = require("../show_list/ShowListController");
const DispatchBookingEntriesController_1 = require("../import/dispatch_booking_entries/DispatchBookingEntriesController");
const Controller = {
    read_csv_file: ReadCSVFileController_1.ReadCSVFileController,
    create_account: CreateAccountController_1.CreateAccountController,
    show_list: ShowListController_1.ShowListController,
    dispatch_booking_entries: DispatchBookingEntriesController_1.DispatchBookingEntriesController,
};
exports.Controller = Controller;
module.exports = Controller;
//# sourceMappingURL=controller.js.map