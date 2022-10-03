import {ReadCSVFilePresenter} from "../import/read_csv_file/ReadCSVFilePresenter";
import {CreateAccountPresenter} from "../create/CreateAccountPresenter";
import {ShowListPresenter} from "../show_list/ShowListPresenter";
import {DispatchBookingEntriesPresenter} from "../import/dispatch_booking_entries/DispatchBookingEntriesPresenter";

const Presenter = {
    read_csv_file: ReadCSVFilePresenter,
    create_account: CreateAccountPresenter,
    show_list: ShowListPresenter,
    dispatch_booking_entries: DispatchBookingEntriesPresenter,
}
module.exports = {Presenter};
export {Presenter}