const {ipcRenderer} = require("electron");
const UseCaseView = require("../../../common/ui/use_case/UseCaseView");


class ShowListView extends UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name)
    }

    async create_view() {
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
    };

    static show_accounts(account_name_list) {
        console.log(account_name_list);
        // <div className="sideboard-entry-list-entry clickable selectable">Bank</div>
        // <div className="sideboard-entry account-list vbox active">

        let account_list_div = document.querySelector('.sideboard-entry.account-list');
        for (let entry of account_name_list) {
            let entry_div = document.createElement('div');
            entry_div.classList.add("sideboard-entry-list-entry", "clickable", "selectable");
            entry_div.innerHTML = entry;
            account_list_div.appendChild(entry_div);
        }
    }

}

ipcRenderer.on('show_list:show_account_name_list', (e, account_name_list) => {
    ShowListView.show_accounts(account_name_list);
});
//
// ipcRenderer.on('read_csv_file:show_booking_records', (e, booking_records) => {
//     ShowListView.show_booking_records(booking_records);
// });
module.exports = ShowListView;