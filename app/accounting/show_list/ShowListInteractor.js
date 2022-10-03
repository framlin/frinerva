"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListInteractor = void 0;
const UseCaseInteractor = require("../../common/use_case/UseCaseInteractor");
// const Accounting = require('../account/Accounting');
const Accounting_1 = require("../account/Accounting");
class ShowListInteractor extends UseCaseInteractor {
    async execute() {
        let accounting = new Accounting_1.Accounting(this._helper);
        let account_list = await accounting.get_account_names();
        this._presenter.show(account_list);
    }
}
exports.ShowListInteractor = ShowListInteractor;
module.exports = ShowListInteractor;
//# sourceMappingURL=ShowListInteractor.js.map