const ReadCSVFileView = require("../import/read_csv_file/ui/ReadCSVFileView");
const CreateAccountView = require("../create/ui/CreateAccountView");
const ShowListView = require("../show_list/ui/ShowListView");
const DispatchBookingEntriesView = require("../import/dispatch_booking_entries/ui/DispatchBookingEntriesView");
const Views = {
    read_csv_file: ReadCSVFileView,
    create_account: CreateAccountView,
    show_list: ShowListView,
    dispatch_booking_entries: DispatchBookingEntriesView,
}

module.exports = Views;