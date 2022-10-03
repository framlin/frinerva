"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListView = void 0;
const { ipcRenderer, contextBridge } = require("electron");
const { UseCaseView } = require("../../../common/ui/use_case/UseCaseView");
const path = require('path');
let show_list_view;
class ShowListView extends UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name);
        show_list_view = this;
    }
    async create_view() {
        await this.add_script(path.join(__dirname, 'show_list.js'));
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    }
    ;
}
exports.ShowListView = ShowListView;
let show_account_name_list;
contextBridge.exposeInMainWorld('accounting__show_list', {
    show_account_name_list: (callback) => {
        show_account_name_list = callback;
    }
});
ipcRenderer.on('show_list:show_account_name_list', (e, account_name_list) => {
    show_account_name_list(account_name_list);
});
module.exports = { ShowListView };
//# sourceMappingURL=ShowListView.js.map