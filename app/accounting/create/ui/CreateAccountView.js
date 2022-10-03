"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountView = void 0;
const { UseCaseView } = require("../../../common/ui/use_case/UseCaseView");
const { ipcRenderer, contextBridge } = require("electron");
const path = require('path');
let create_account_view;
class CreateAccountView extends UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name);
        this.account_creation_finished = () => { };
        this.show_booking_period_list = () => { };
        this.show_cost_center_list = () => { };
        this.show_new_accounts_list = () => { };
        this.show_error = () => { };
        create_account_view = this;
    }
    async create_view() {
        await this.add_script(path.join(__dirname, 'create_account.js'));
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }
    ;
    register_event_listener() {
        this.on_register_callback();
    }
    ;
}
exports.CreateAccountView = CreateAccountView;
contextBridge.exposeInMainWorld('accounting__create_account', {
    show_cost_center_list: (callback) => {
        create_account_view.show_cost_center_list = callback;
    },
    show_booking_period_list: (callback) => {
        create_account_view.show_booking_period_list = callback;
    },
    show_new_accounts_list: (callback) => {
        create_account_view.show_new_accounts_list = callback;
    },
    show_error: (callback) => {
        create_account_view.show_error = callback;
    },
    account_creation_finished: (callback) => {
        create_account_view.account_creation_finished = callback;
    },
    register_event_listener: (callback) => {
        create_account_view.on_register_callback = callback;
    },
    send_create: (new_accounts_list) => ipcRenderer.send('create_account:create', new_accounts_list),
    // @ts-ignore
    send_period_cost_center_selected: ({ periods, accounts }) => ipcRenderer.send('create_account:period_cost_center-selected', { periods, accounts }),
});
ipcRenderer.on('create_account:show_cost_center_list', (e, cost_center_list) => {
    create_account_view.show_cost_center_list(cost_center_list);
});
ipcRenderer.on('create_account:show_booking_period_list', (e, booking_period_list) => {
    create_account_view.show_booking_period_list(booking_period_list);
});
ipcRenderer.on('create_account:show_new_accounts_list', (e, new_accounts_list) => {
    create_account_view.show_new_accounts_list(new_accounts_list);
});
ipcRenderer.on('create_account:show_error', (e, error_message) => {
    create_account_view.show_error(error_message);
});
ipcRenderer.on('create_account:done', () => {
    create_account_view.account_creation_finished();
});
module.exports = { CreateAccountView };
//# sourceMappingURL=CreateAccountView.js.map