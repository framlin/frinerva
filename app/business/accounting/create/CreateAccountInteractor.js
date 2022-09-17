const UseCaseInteractor = require("../../use_case/UseCaseInteractor");

class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this.helper.load_cost_center_configuration();
        this._presenter.show_cost_center_list(JSON.parse(cost_center_config));

        let booking_period_config = await this.helper.load_booking_period_configuration();
        this._presenter.show_booking_period_list(JSON.parse(booking_period_config))
    }

    period_cost_center_selection(period_cost_center) {
        let new_entry_list = []
        let period;
        let cost_center;
        let label;
        for (let period_ of period_cost_center.periods) {
            period = period_;
            for (let cost_center_ of period_cost_center.accounts) {
                cost_center = cost_center_.key;
                label = cost_center_.label;
                new_entry_list.push({period, cost_center, label});
            }
        }

        this._presenter.show_new_accounts_list(new_entry_list);
    }

    create(new_accounts_list) {
        console.log("CreateAccountInteractor:: create")
        console.log(new_accounts_list);

    }
}

module.exports = CreateAccountInteractor;