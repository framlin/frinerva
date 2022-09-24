const ReadCSVFilePresenter = require("../import/read_csv_file/ReadCSVFilePresenter");
const CreateAccountPresenter = require("../create/CreateAccountPresenter");
const ShowListPresenter = require("../show_list/ShowListPresenter");
const DispatchBookingEntriesPresenter = require("../import/dispatch_booking_entries/DispatchBookingEntriesPresenter");
const Presenter = {
    read_csv_file: ReadCSVFilePresenter,
    create_account: CreateAccountPresenter,
    show_list: ShowListPresenter,
    dispatch_booking_entries: DispatchBookingEntriesPresenter,
}
module.exports = Presenter;