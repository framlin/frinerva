const ReadCSVFile = require("../import/read_csv_file/ReadCSVFile");
const {CreateAccount} = require("../create/CreateAccount");
const ShowList = require("../show_list/ShowList");
const {DispatchBookingEntries} = require("../import/dispatch_booking_entries/DispatchBookingEntries");

import {UseCase} from "../../common/use_case/UseCase";

interface UseCaseList {
    [use_case_name: string] : UseCase
}
let UseCases : UseCaseList = {
    read_csv_file: ReadCSVFile,
    create_account: CreateAccount,
    show_list: ShowList,
    dispatch_booking_entries: DispatchBookingEntries,
};

export {UseCases}
