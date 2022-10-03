"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListPresenter = void 0;
const UseCasePresenter_1 = require("../../common/use_case/UseCasePresenter");
let presenter;
class ShowListPresenter extends UseCasePresenter_1.UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }
    show(account_name_list) {
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}
exports.ShowListPresenter = ShowListPresenter;
module.exports = { ShowListPresenter };
//# sourceMappingURL=ShowListPresenter.js.map