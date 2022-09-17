const {ipcMain} = require("electron");
const UseCasePresenter = require("../../use_case/UseCasePresenter");

let presenter;

class CreateAccountPresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_cost_center_list(cost_center_list) {
        this._ipc_channel.send('create_account:show_cost_center_list', cost_center_list);
    }

    on_create() {
        console.log("CreateAccountPresenter ON CREATE")
    }
}

ipcMain.on('create_account:create', () => {
    presenter.on_create();
});

module.exports = CreateAccountPresenter;