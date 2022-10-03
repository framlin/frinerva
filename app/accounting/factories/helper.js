const {ReadCSVFileHelper} = require("../import/read_csv_file/ReadCSVFileHelper");
const {CreateAccountHelper} = require("../create/CreateAccountHelper");
const {ShowListHelper} = require("../show_list/ShowListHelper");
const {DispatchBookingEntriesHelper} = require("../import/dispatch_booking_entries/DispatchBookingEntriesHelper");
const Helper = {
    read_csv_file: ReadCSVFileHelper,
    create_account: CreateAccountHelper,
    show_list: ShowListHelper,
    dispatch_booking_entries: DispatchBookingEntriesHelper,
}
module.exports = Helper;