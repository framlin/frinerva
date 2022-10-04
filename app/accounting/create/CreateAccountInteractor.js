"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountInteractor = void 0;
const { UseCaseInteractor } = require("../../common/use_case/UseCaseInteractor");
const { Accounting } = require("../account/Accounting");
class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this._helper.load_cost_center_configuration();
        this._response_boundary.show_cost_center_list(JSON.parse(cost_center_config));
        let booking_period_config = await this._helper.load_booking_period_configuration();
        this._response_boundary.show_booking_period_list(JSON.parse(booking_period_config));
    }
    period_cost_center_selection(period_cost_center) {
        let new_entry_list = [];
        let booking_period;
        let cost_center;
        let label;
        for (let period_ of period_cost_center.periods) {
            booking_period = period_;
            for (let cost_center_ of period_cost_center.accounts) {
                cost_center = cost_center_.key;
                label = cost_center_.label;
                new_entry_list.push({ booking_period, cost_center, label });
            }
        }
        this._response_boundary.show_new_accounts_list(new_entry_list);
    }
    async create(new_accounts_list) {
        let accounting = new Accounting(this._helper);
        for (let new_account of new_accounts_list) {
            let booking_period = new_account.booking_period;
            let cost_center = new_account.cost_center;
            let account = await accounting.create_account(booking_period, cost_center);
            if (!account) {
                this._response_boundary.show_error({ error: 'ACCOUNT_EXIST', booking_period, cost_center });
            }
        }
        this._response_boundary.account_creation_done();
    }
}
exports.CreateAccountInteractor = CreateAccountInteractor;
module.exports = { CreateAccountInteractor };
//# sourceMappingURL=CreateAccountInteractor.js.map