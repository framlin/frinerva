const UseCasePresenter = require("../../common/use_case/UseCasePresenter");

let presenter: ShowListPresenter;
class ShowListPresenter extends UseCasePresenter{
    constructor(ipc_chanel: any) {
        super(ipc_chanel);
        presenter = this;
    }

    show(account_name_list: any) {
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}

module.exports = ShowListPresenter;
export {ShowListPresenter}