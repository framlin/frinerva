const {ReadCSVFileInteractor} = require("../import/read_csv_file/ReadCSVFileInteractor");
const {CreateAccountInteractor} = require("../create/CreateAccountInteractor");
const ShowListInteractor = require("../show_list/ShowListInteractor");
const {DispatchBookingEntriesInteractor} = require("../import/dispatch_booking_entries/DispatchBookingEntriesInteractor");

const Interactors = {
    read_csv_file: ReadCSVFileInteractor,
    create_account: CreateAccountInteractor,
    show_list: ShowListInteractor,
    dispatch_booking_entries: DispatchBookingEntriesInteractor,
}
module.exports = Interactors;