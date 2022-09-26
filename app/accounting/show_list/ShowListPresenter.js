const UseCasePresenter = require("../../common/use_case/UseCasePresenter");
let presenter;
class ShowListPresenter extends UseCasePresenter{
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show(account_name_list) {
        console.log("PRESENTER-SEND->show_list:show_account_name_list")
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}

module.exports = ShowListPresenter;