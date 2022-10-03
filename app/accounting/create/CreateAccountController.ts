const {UseCaseController} = require("../../common/use_case/UseCaseController");

class CreateAccountController extends UseCaseController {
    period_cost_center_selection(period_cost_center: any) {
        this._interactor.period_cost_center_selection(period_cost_center);
    }

    create(new_accounts_list: any) {
        this._interactor.create(new_accounts_list).then();
    }
}

module.exports = {CreateAccountController};
export {CreateAccountController}