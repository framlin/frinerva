const UseCaseView = require("../../use_case/UseCaseView");
const {ipcRenderer} = require("electron");

class CreateAccountView extends UseCaseView {
    register_create_button() {
        let create_button = document.querySelector('.next-btn');
        create_button.addEventListener('click', () => {
            ipcRenderer.send('create_account:create')
        });
    }

    register_account_list_entry_selection() {
        let list_entries = document.querySelectorAll('.selectable');
        list_entries.forEach((list_entry) => {
            list_entry.addEventListener('click', (e) => {
                list_entry.classList.toggle('selected');
            })
        })
    };

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname)
    }

    register_event_listener() {
        this.register_create_button();
        this.register_account_list_entry_selection();
    }

}

module.exports = CreateAccountView;