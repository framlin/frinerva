import {UseCase} from "../../common/use_case/UseCase";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";
import {Blueprint} from "../../common/use_case/Blueprint";

type UseCaseList = Record < string, Blueprint > ;

let UseCases : UseCaseList = {
    read_csv_file: read_csv_file_blueprint,
    create_account: create_account_blueprint,
    show_list: show_list_blueprint,
    show_account: show_account_blueprint,
    dispatch_booking_entries: dispatch_booking_entries_blueprint,
};

export {UseCases}
