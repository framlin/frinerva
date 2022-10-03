"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCases = void 0;
const ReadCSVFile_1 = require("../import/read_csv_file/ReadCSVFile");
const CreateAccount_1 = require("../create/CreateAccount");
const ShowList_1 = require("../show_list/ShowList");
const DispatchBookingEntries_1 = require("../import/dispatch_booking_entries/DispatchBookingEntries");
let UseCases = {
    //@ts-ignore
    read_csv_file: ReadCSVFile_1.ReadCSVFile,
    //@ts-ignore
    create_account: CreateAccount_1.CreateAccount,
    //@ts-ignore
    show_list: ShowList_1.ShowList,
    //@ts-ignore
    dispatch_booking_entries: DispatchBookingEntries_1.DispatchBookingEntries,
};
exports.UseCases = UseCases;
//# sourceMappingURL=use_cases.js.map