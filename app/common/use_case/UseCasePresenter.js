const {ipcMain} = require('electron');
let presenter;

class UseCasePresenter{

    constructor(ipc_chanel) {
        this._ipc_channel = ipc_chanel;
        presenter = this;
    }

    execute(use_case_name) {
        this._ipc_channel.send('use_case:created', use_case_name);
    }

    forward(use_case_name) {
        this._controller.forward(use_case_name);
    }

    get controller() {
        return this._controller;
    }

    set controller(value) {
        this._controller = value;
    }

    on_use_case_view_ready() {
        this._controller.execute();
    }

    _ipc_channel;
    _controller;
}

ipcMain.on('use_case:view_ready', (e) => {
    presenter.on_use_case_view_ready()
})

module.exports = UseCasePresenter;