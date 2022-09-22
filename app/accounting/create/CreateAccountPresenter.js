const {ipcMain} = require("electron");
const UseCasePresenter = require("../../common/use_case/UseCasePresenter");

let presenter;

class CreateAccountPresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_cost_center_list(cost_center_list) {
        this._ipc_channel.send('create_account:show_cost_center_list', cost_center_list);
    }

    show_booking_period_list(booking_period_list) {
        this._ipc_channel.send('create_account:show_booking_period_list', booking_period_list);
    }

    show_new_accounts_list(new_entry_list) {
        this._ipc_channel.send('create_account:show_new_accounts_list', new_entry_list);
    }

    show_error(error_object) {
        let error_message = `Fehler: ${error_object.error}`
        if (error_object.error === "ACCOUNT_EXIST") {
            error_message = `Das Konto ${error_object.booking_period} - ${error_object.cost_center} existiert breits.\n
            Es wurde kein neues Konto anglegt.`
        }
        this._ipc_channel.send('create_account:show_error', error_message);
    }

    account_creation_done() {
        this._ipc_channel.send('create_account:done');
    }

    on_period_cost_center_selection(period_cost_center) {
        this._controller.period_cost_center_selection(period_cost_center);
    }

    on_create(new_accounts_list) {
        this._controller.create(new_accounts_list);
    }
}

ipcMain.on('create_account:period_cost_center-selected', (e, period_cost_center) => {
    presenter.on_period_cost_center_selection(period_cost_center);
})

ipcMain.on('create_account:create', (e, new_accounts_list) => {
    presenter.on_create(new_accounts_list);
});

module.exports = CreateAccountPresenter;