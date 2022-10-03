"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountController = void 0;
const { UseCaseController } = require("../../common/use_case/UseCaseController");
class CreateAccountController extends UseCaseController {
    period_cost_center_selection(period_cost_center) {
        this._interactor.period_cost_center_selection(period_cost_center);
    }
    create(new_accounts_list) {
        this._interactor.create(new_accounts_list).then();
    }
}
exports.CreateAccountController = CreateAccountController;
module.exports = { CreateAccountController };
//# sourceMappingURL=CreateAccountController.js.map