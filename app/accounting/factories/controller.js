const ReadCSVFileController = require("../import/read_csv_file/ReadCSVFileController");
const CreateAccountController = require("../create/CreateAccountController");
const ShowListController = require("../show_list/ShowListController");
const DispatchBookingEntriesController = require("../import/dispatch_booking_entries/DispatchBookingEntriesController");
const Controller = {
    read_csv_file: ReadCSVFileController,
    create_account: CreateAccountController,
    show_list: ShowListController,
    dispatch_booking_entries: DispatchBookingEntriesController,
}
module.exports = Controller;