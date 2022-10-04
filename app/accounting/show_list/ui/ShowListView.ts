const {ipcRenderer, contextBridge} = require("electron");
const {UseCaseView} = require("../../../common/ui/use_case/UseCaseView");

let show_list_view: ShowListView;

class ShowListView extends UseCaseView {
    constructor(use_case_name: string) {
        super('accounting', use_case_name);
        show_list_view = this;
    }

    register_event_listener() {}

    async create_view() {
        // await this.add_script(path.join(__dirname, 'show_list.js'));
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    };

    show_account_name_list(account_name_list: string[]) {
        let account_list_div = document.querySelector('.sideboard-entry.account-list') as HTMLDivElement;
        if (account_list_div) {
            for (let entry of account_name_list) {
                let entry_div = document.createElement('div');
                entry_div.classList.add("sideboard-entry-list-entry", "clickable", "selectable");
                entry_div.innerHTML = entry;
                account_list_div.appendChild(entry_div);
            }
        }
    };
}

ipcRenderer.on('show_list:show_account_name_list', (e, account_name_list: any) => {
    show_list_view.show_account_name_list(account_name_list);
})

module.exports = {ShowListView};
export {ShowListView}