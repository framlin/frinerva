import {ReadCSVFileController} from "../import/read_csv_file/ReadCSVFileController";
import {CreateAccountController} from "../create/CreateAccountController";
import {ShowListController} from "../show_list/ShowListController";
import {DispatchBookingEntriesController} from "../import/dispatch_booking_entries/DispatchBookingEntriesController";

const Controller = {
    read_csv_file: ReadCSVFileController,
    create_account: CreateAccountController,
    show_list: ShowListController,
    dispatch_booking_entries: DispatchBookingEntriesController,
}
module.exports = {Controller};
export {Controller}