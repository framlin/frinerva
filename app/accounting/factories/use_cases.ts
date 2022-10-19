import {ReadCSVFile} from "../import/read_csv_file/ReadCSVFile";
import {CreateAccount} from "../create/CreateAccount";
import {ShowList} from "../show_list/ShowList";
import {DispatchBookingEntries} from "../import/dispatch_booking_entries/DispatchBookingEntries";

import {UseCase} from "../../common/use_case/UseCase";
import {ShowAccount} from "../show_account/ShowAccount";

interface UseCaseList {
    [use_case_name: string] : UseCase
}
let UseCases : UseCaseList = {
    //@ts-ignore
    read_csv_file: ReadCSVFile,
    //@ts-ignore
    create_account: CreateAccount,
    //@ts-ignore
    show_list: ShowList,
    //@ts-ignore
    show_account: ShowAccount,
    //@ts-ignore
    dispatch_booking_entries: DispatchBookingEntries,
};

export {UseCases}
