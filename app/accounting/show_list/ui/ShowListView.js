const {ipcRenderer, contextBridge} = require("electron");
const UseCaseView = require("../../../common/ui/use_case/UseCaseView");
const path = require('path');


class ShowListView extends UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name)
    }

    async create_view() {
        await this.add_script(path.join(__dirname, 'show_list.js'));
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    };
}

contextBridge.exposeInMainWorld('accounting__show_list', {
    show_account_name_list: (callback) => ipcRenderer.on('show_list:show_account_name_list', callback)
});
module.exports = ShowListView;