const {ipcRenderer, contextBridge} = require("electron");
const UseCaseView = require("../../../common/ui/use_case/UseCaseView");
const path = require('path');

let show_list_view;
class ShowListView extends UseCaseView {
    constructor(use_case_name: string) {
        super('accounting', use_case_name);
        show_list_view = this;
    }

    async create_view() {
        await this.add_script(path.join(__dirname, 'show_list.js'));
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    };
    static show_account_name_list: any;
}
let show_account_name_list: any;
contextBridge.exposeInMainWorld('accounting__show_list', {
    show_account_name_list: (callback: Function) => {
        show_account_name_list = callback
    }
});

ipcRenderer.on('show_list:show_account_name_list', (e, account_name_list: any) => {
    show_account_name_list(account_name_list);
})

module.exports = {ShowListView};
export {ShowListView}