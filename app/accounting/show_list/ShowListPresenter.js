const UseCasePresenter = require("../../common/use_case/UseCasePresenter");
const {ipcMain} = require("electron");
let presenter;
class ShowListPresenter extends UseCasePresenter{
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show(account_name_list) {
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}

// ipcMain.on('read_csv_file:next', () => {
//     presenter.on_next()
// });

module.exports = ShowListPresenter;