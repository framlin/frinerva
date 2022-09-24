const UseCaseView = require("../../../common/ui/use_case/UseCaseView");
const {ipcRenderer, contextBridge} = require("electron");
const path = require('path');

let create_account_view;

class CreateAccountView extends UseCaseView {

    constructor(use_case_name) {
        super('accounting', use_case_name);
        create_account_view = this;
    }


    async create_view() {
        await this.add_script(path.join(__dirname, 'create_account.js'));
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    };

    register_event_listener() {
        this.on_register_callback();
    };
}

contextBridge.exposeInMainWorld('accounting__create_account', {
    show_cost_center_list: (callback) => ipcRenderer.on('create_account:show_cost_center_list', callback),
    show_booking_period_list: (callback) => ipcRenderer.on('create_account:show_booking_period_list', callback),
    show_new_accounts_list: (callback) => ipcRenderer.on('create_account:show_new_accounts_list', callback),
    show_error: (callback) => ipcRenderer.on('create_account:show_error', callback),
    account_creation_finished: (callback) => ipcRenderer.on('create_account:done', callback),
    register_event_listener: (callback) => {create_account_view.on_register_callback = callback},
    send_create: (new_accounts_list) => ipcRenderer.send('create_account:create', new_accounts_list),
    send_period_cost_center_selected: ({periods, accounts}) => ipcRenderer.send('create_account:period_cost_center-selected', {periods, accounts}),
});

module.exports = CreateAccountView;