import {ReadCSVFileInteractor} from "../import/read_csv_file/ReadCSVFileInteractor";
import {CreateAccountInteractor} from "../create/CreateAccountInteractor";
import {ShowListInteractor} from "../show_list/ShowListInteractor";
import {DispatchBookingEntriesInteractor} from "../import/dispatch_booking_entries/DispatchBookingEntriesInteractor";
import {ShowAccountInteractor} from "../show_account/ShowAccountInteractor";

const Interactors = {
    read_csv_file: ReadCSVFileInteractor,
    create_account: CreateAccountInteractor,
    show_list: ShowListInteractor,
    show_account: ShowAccountInteractor,
    dispatch_booking_entries: DispatchBookingEntriesInteractor,
}
module.exports = {Interactors};
export {Interactors}