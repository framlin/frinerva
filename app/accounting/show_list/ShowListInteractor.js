"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowListInteractor = void 0;
const UseCaseInteractor_1 = require("../../common/use_case/UseCaseInteractor");
class ShowListInteractor extends UseCaseInteractor_1.UseCaseInteractor {
    async execute() {
        // let accounting: Accounting = new Accounting(this._helper);
        let account_list = await this._domain_entity.get_account_names();
        if (this._response_boundary)
            this._response_boundary.show(account_list);
    }
}
exports.ShowListInteractor = ShowListInteractor;
module.exports = { ShowListInteractor };
//# sourceMappingURL=ShowListInteractor.js.map