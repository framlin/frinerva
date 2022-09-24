const UseCaseHelper = require("../../common/use_case/UseCaseHelper");

const JSONStorage = require("../../common/persistence/json/JSONStorage");
const path = require("path");

const STORAGE_ROOT_DIR = path.join(__dirname,"../../common/persistence/data") ;

class ShowListHelper extends UseCaseHelper{

    async get_account_name_list() {
        let result = [];
        let name_list =  await JSONStorage.get_name_list(path.join(STORAGE_ROOT_DIR, `account`, ""));
        for (let {dir_name, filename} of name_list) {
            let booking_period = dir_name;
            let cost_center = filename.split('.')[0];
            result.push({booking_period, cost_center});
        }
        return result;
    }

    async load_cost_center_configuration() {
        return await JSONStorage.load(path.join(__dirname, "../configuration/cost-center.json"));
    }

}

module.exports = ShowListHelper;