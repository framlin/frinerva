const UseCaseHelper = require("../../use_case/UseCaseHelper");
const JSONStorage = require("../../../persitence/json/JSONStorage");
const path = require("path");

class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await JSONStorage.load(path.join(__dirname, "../../configuration/cost-center.json"));
    }
}

module.exports = CreateAccountHelper;
