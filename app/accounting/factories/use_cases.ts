import {UseCase} from "../../common/use_case/UseCase";
import {read_csv_file_blueprint} from "../import/read_csv_file/read_csv_file_blueprint";
import {create_account_blueprint} from "../create/create_account_blueprint";
import {show_list_blueprint} from "../show_list/show_list_blueprint";
import {show_account_blueprint} from "../show_account/show_account_blueprint";
import {
    dispatch_booking_entries_blueprint
} from "../import/dispatch_booking_entries/dispatch_booking_entries_blueprint";

type UseCaseList = Record < string, typeof UseCase > ;

let UseCases : UseCaseList = {
    //@ts-ignore
    read_csv_file: read_csv_file_blueprint.usecase,
    //@ts-ignore
    create_account: create_account_blueprint.usecase,
    //@ts-ignore
    show_list: show_list_blueprint.usecase,
    //@ts-ignore
    show_account: show_account_blueprint.usecase,
    //@ts-ignore
    dispatch_booking_entries: dispatch_booking_entries_blueprint.usecase,
};

export {UseCases}
