import {ReadCSVFileView} from "../import/read_csv_file/ui/ReadCSVFileView";
import {CreateAccountView} from "../create/ui/CreateAccountView";
import {ShowListView} from "../show_list/ui/ShowListView";
import {DispatchBookingEntriesView} from "../import/dispatch_booking_entries/ui/DispatchBookingEntriesView";
import {ShowAccountView} from "../show_account/ui/ShowAccountView";
const Views = {
    read_csv_file: ReadCSVFileView,
    create_account: CreateAccountView,
    show_list: ShowListView,
    show_account: ShowAccountView,
    dispatch_booking_entries: DispatchBookingEntriesView,
}

module.exports = {Views};
export {Views}