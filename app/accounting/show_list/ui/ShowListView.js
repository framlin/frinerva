"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListView = void 0;
const electron_1 = require("electron");
const UseCaseView_1 = require("../../../common/ui/use_case/UseCaseView");
let show_list_view;
class ShowListView extends UseCaseView_1.UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name);
        show_list_view = this;
    }
    register_event_listener() { }
    async create_view() {
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    }
    ;
    _clear_account_name_list(account_name_list) {
        while (account_name_list.firstChild) {
            try {
                account_name_list.removeChild(account_name_list.firstChild);
            }
            catch (e) {
            }
        }
    }
    show_account_name_list(account_name_list) {
        let account_list_div = document.querySelector('.sideboard-entry.account-list');
        if (account_list_div) {
            this._clear_account_name_list(account_list_div);
            for (let entry of account_name_list) {
                let entry_div = document.createElement('div');
                entry_div.classList.add("sideboard-entry-list-entry", "clickable", "selectable");
                entry_div.innerHTML = entry;
                account_list_div.appendChild(entry_div);
            }
        }
    }
    ;
}
exports.ShowListView = ShowListView;
electron_1.ipcRenderer.on('show_list:show_account_name_list', (e, account_name_list) => {
    show_list_view.show_account_name_list(account_name_list);
});
module.exports = { ShowListView };
//# sourceMappingURL=ShowListView.js.map