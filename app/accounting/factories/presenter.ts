import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";


export const Presenter: Record<string, typeof UseCasePresenter> = {
    read_csv_file: read_csv_file_blueprint.presenter,
    // @ts-ignore
    create_account: create_account_blueprint.presenter,
    show_list: show_list_blueprint.presenter,
    show_account: show_account_blueprint.presenter,
    dispatch_booking_entries: dispatch_booking_entries_blueprint.presenter,
}
