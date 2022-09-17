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

    show_booking_period_list(booking_period_list) {
        this._ipc_channel.send('create_account:show_booking_period_list', booking_period_list);
    }

    show_new_accounts_list(new_entry_list) {
        this._ipc_channel.send('create_account:show_new_accounts_list', new_entry_list);
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