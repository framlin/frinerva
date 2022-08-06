class Balancing {
    constructor() {
        this._balances = [];
    }
    register(balance){
        this._balances.push(balance)
    }

    get_accounts(cost_center, booking_period) {
        let balances = [];
        let accounts = []
        for(let balance of this._balances) {
            if (balance.booking_period === booking_period){
                balances.push(balance);
            }
        }

        for(let balance of balances) {
            for (let account of balance.accounts) {
                if (account.cost_center === cost_center) {
                    accounts.push(account);
                }
            }
        }
        return accounts;
    }
}

module.exports = Balancing;