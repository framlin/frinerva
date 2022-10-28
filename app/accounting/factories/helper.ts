import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";

export const Helper: Record<string, typeof UseCaseHelper> = {
    read_csv_file: read_csv_file_blueprint.helper,
    create_account: create_account_blueprint.helper,
    show_list: show_list_blueprint.helper,
    show_account: show_account_blueprint.helper,
    dispatch_booking_entries: dispatch_booking_entries_blueprint.helper,
}
