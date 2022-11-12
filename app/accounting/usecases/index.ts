import {create_account} from "./create_account";
import {dispatch_booking_entries} from "./import/dispatch_booking_entries";
import {read_csv_file} from "./import/read_csv_file";
import {show_account} from "./show_account";
import {show_list} from "./show_list";
import {UseCaseList} from "../../common/usecase/UseCaseList";

export const UseCases: UseCaseList = {
    read_csv_file,
    create_account,
    show_list,
    show_account,
    dispatch_booking_entries,
};

