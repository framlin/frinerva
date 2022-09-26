const {ipcMain} = require('electron');
let presenter;

class UseCasePresenter{

    constructor(ipc_chanel) {
        this._ipc_channel = ipc_chanel;
        presenter = this;
    }

    execute(use_case_name, ...data) {
        console.log("USE_CASE_PRESENTER.execute")
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }

    forward(domain_name, use_case_name) {
        this._controller.forward(domain_name, use_case_name);
    }

    get controller() {
        return this._controller;
    }

    set controller(value) {
        this._controller = value;
    }

    on_use_case_view_ready(...data) {
        this._controller.execute(...data);
    }

    _ipc_channel;
    _controller;
}

ipcMain.on('use_case:view_ready', (e, domain_name, use_case_name, ...data) => {
    console.log("USE_CASE_PRESNTER.use_case:view_ready")
    presenter.on_use_case_view_ready(...data)
})

module.exports = UseCasePresenter;