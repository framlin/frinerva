import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";

export const Interactors: Record<string, typeof UseCaseInteractor> = {
    read_csv_file: read_csv_file_blueprint.interactor,
    create_account: create_account_blueprint.interactor,
    show_list: show_list_blueprint.interactor,
    show_account: show_account_blueprint.interactor,
    dispatch_booking_entries: dispatch_booking_entries_blueprint.interactor,
}
