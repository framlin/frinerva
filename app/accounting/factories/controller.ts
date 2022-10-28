import {UseCaseController} from "../../common/use_case/UseCaseController";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";

export const Controller : Record<string, typeof UseCaseController> = {
    read_csv_file: read_csv_file_blueprint.controller,
    create_account: create_account_blueprint.controller,
    show_list: show_list_blueprint.controller,
    show_account: show_account_blueprint.controller,
    dispatch_booking_entries: dispatch_booking_entries_blueprint.controller,
}
