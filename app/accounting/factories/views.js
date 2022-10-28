"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const read_csv_file_blueprint_1 = require("../import/read_csv_file/read_csv_file_blueprint");
const create_account_blueprint_1 = require("../create/create_account_blueprint");
const show_list_blueprint_1 = require("../show_list/show_list_blueprint");
const show_account_blueprint_1 = require("../show_account/show_account_blueprint");
const dispatch_booking_entries_blueprint_1 = require("../import/dispatch_booking_entries/dispatch_booking_entries_blueprint");
exports.Views = {
    read_csv_file: read_csv_file_blueprint_1.read_csv_file_blueprint.view,
    create_account: create_account_blueprint_1.create_account_blueprint.view,
    show_list: show_list_blueprint_1.show_list_blueprint.view,
    show_account: show_account_blueprint_1.show_account_blueprint.view,
    dispatch_booking_entries: dispatch_booking_entries_blueprint_1.dispatch_booking_entries_blueprint.view,
};
//# sourceMappingURL=views.js.map