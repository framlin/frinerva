const UseCaseHelper = require("../../common/use_case/UseCaseHelper");
const JSONStorage = require("../../common/persistence/json/JSONStorage");
const path = require("path");

const STORAGE_ROOT_DIR = path.join(__dirname,"../../common/persistence/data") ;
class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await JSONStorage.load(path.join(__dirname, "../configuration/cost-center.json"));
    }

    async load_booking_period_configuration() {
        return await JSONStorage.load(path.join(__dirname, "../configuration/booking-period.json"));
    }

    async load_account(booking_period, cost_center) {
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        if (JSONStorage.exists(account_file_name)) {
            return await JSONStorage.load();
        } else {
            return Promise.resolve(null);
        }
    }

    async save_account(account) {
        let serialized_account = JSON.stringify(account);
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${account.booking_period}/${account.cost_center}.json`);
        await JSONStorage.save(account_file_name, serialized_account);
    }

    account_exists(booking_period, cost_center) {
        let account_file_name = path.join(STORAGE_ROOT_DIR, `account/${booking_period}/${cost_center}.json`);
        return JSONStorage.exists(account_file_name);
    }

}

module.exports = CreateAccountHelper;
