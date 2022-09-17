const UseCaseInteractor = require("../../use_case/UseCaseInteractor");

class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this.helper.load_cost_center_configuration();
        this._presenter.show_cost_center_list(JSON.parse(cost_center_config));

        let booking_period_config = await this.helper.load_booking_period_configuration();
        this._presenter.show_booking_period_list(JSON.parse(booking_period_config))
    }
}

module.exports = CreateAccountInteractor;