const UseCaseInteractor = require("../../use_case/UseCaseInteractor");

class CreateAccountInteractor extends UseCaseInteractor {
    async execute() {
        let cost_center_config = await this.helper.load_cost_center_configuration();
        this._presenter.show_cost_center_list(JSON.parse(cost_center_config));
    }
}

module.exports = CreateAccountInteractor;