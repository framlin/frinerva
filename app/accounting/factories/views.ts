import {UseCaseView} from "../../common/ui/use_case/UseCaseView";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";

export const Views : Record<string, typeof UseCaseView>= {
    read_csv_file: read_csv_file_blueprint.view,
    create_account: create_account_blueprint.view,
    show_list: show_list_blueprint.view,
    show_account: show_account_blueprint.view,
    dispatch_booking_entries: dispatch_booking_entries_blueprint.view,
}
