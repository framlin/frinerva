const path = require("path");
const Account = require("./Account");

class Accounting{

    account_storage;

    constructor(account_storage) {
        this.account_storage = account_storage;
    }

    async create_account(booking_period, cost_center) {
        let account = null;
        if (!this.account_storage.account_exists(booking_period, cost_center)) {
            account = new Account(booking_period, cost_center);
            await this.account_storage.save_account(account);
        }
        return account;
    }

}

module.exports = Accounting;