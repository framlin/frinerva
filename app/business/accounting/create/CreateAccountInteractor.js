const UseCaseInteractor = require("../../use_case/UseCaseInteractor");
const Account = require("../account/Account");

class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this._helper.load_cost_center_configuration();
        this._presenter.show_cost_center_list(JSON.parse(cost_center_config));

        let booking_period_config = await this._helper.load_booking_period_configuration();
        this._presenter.show_booking_period_list(JSON.parse(booking_period_config))
    }

    period_cost_center_selection(period_cost_center) {
        let new_entry_list = []
        let booking_period;
        let cost_center;
        let label;
        for (let period_ of period_cost_center.periods) {
            booking_period = period_;
            for (let cost_center_ of period_cost_center.accounts) {
                cost_center = cost_center_.key;
                label = cost_center_.label;
                new_entry_list.push({booking_period, cost_center, label});
            }
        }

        this._presenter.show_new_accounts_list(new_entry_list);
    }

    async create(new_accounts_list) {
        for (let new_account of new_accounts_list) {
            let booking_period = new_account.booking_period;
            let cost_center = new_account.cost_center;
            let account_exists = this._helper.account_exists(booking_period, cost_center);
            if (account_exists) {
                this._presenter.show_error(`Das Konto ${cost_center} für ${booking_period} existiert bereits.\nEs wurde kein neues Konto angelegt`);
            } else {
                let account = new Account(booking_period, cost_center);
                await this._helper.save_account(account);
            }
        }
    }
}

module.exports = CreateAccountInteractor;