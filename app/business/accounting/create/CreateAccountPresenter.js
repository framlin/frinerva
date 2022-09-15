const {ipcMain} = require("electron");
const UseCasePresenter = require("../../use_case/UseCasePresenter");

let presenter;

class CreateAccountPresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    on_create() {
        console.log("CreateAccountPresenter ON CREATE")
    }
}

ipcMain.on('create_account:create', () => {
    presenter.on_create();
});

module.exports = CreateAccountPresenter;