const UseCaseView = require("../../use_case/UseCaseView");
const {ipcRenderer} = require("electron");

class CreateAccountView extends UseCaseView {
    register_create_button() {
        let create_button = document.querySelector('.create-btn');
        create_button.addEventListener('click', () => {
            console.log("CreateAccountView:CREATE")
            ipcRenderer.send('create_account:create')
        });
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.register_create_button();
    }

}

module.exports = CreateAccountView;