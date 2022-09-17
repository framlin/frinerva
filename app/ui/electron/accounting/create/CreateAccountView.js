const UseCaseView = require("../../use_case/UseCaseView");
const {ipcRenderer} = require("electron");

class CreateAccountView extends UseCaseView {
    register_create_button() {
        let create_button = document.querySelector('.next-btn');
        create_button.addEventListener('click', () => {
            ipcRenderer.send('create_account:create')
        });
    };

    register_account_list_entry_selection() {
        let list_entries = document.querySelectorAll('.selectable');
        list_entries.forEach((list_entry) => {
            list_entry.addEventListener('click', (e) => {
                list_entry.classList.toggle('selected');
            });
        });
    };

    register_move_button() {
        let move_entry_button = document.querySelector('#move-entry-btn');
        move_entry_button.addEventListener('click', () => {
            let accounts = [];
            let periods = [];

            let account_selection = document.querySelectorAll('#account-column .selected');
            account_selection.forEach((list_entry) => {
                accounts.push(list_entry.innerHTML);
            })
            let period_selection = document.querySelectorAll('#period-column .selected');
            period_selection.forEach((list_entry) => {
                periods.push(list_entry.innerHTML);
            })

            let result_column = document.querySelector('#result-column');
            for (let account of accounts) {
                for (let period of periods) {
                    let new_entry = document.createElement('div');
                    new_entry.innerHTML= `${period} - ${account}`
                    result_column.appendChild(new_entry);
                }
            }

        });
    };

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    };

    register_event_listener() {
        this.register_create_button();
        this.register_account_list_entry_selection();
        this.register_move_button();
    };

}

module.exports = CreateAccountView;