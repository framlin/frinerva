const Accounting = require('../Accounting');
const Account = require("../Account");

let accounting,
    account_storage;

class AccountStorageSpy {
    save_account_called = false;
    accounting;

    account_exists = (booking_period, cost_center) => {
        return cost_center === "X";
    }

    save_account = async () => {
        this.save_account_called = true;
    }
}


describe('create account', () => {

    beforeEach(() => {
        account_storage = new AccountStorageSpy();
        accounting = new Accounting(account_storage);
    });

    it('returns null, if the account already exists', async () => {
        let account = await accounting.create_account('1', 'X');
        expect(account).toBeNull();
    });

    it('calls save_account, if the account did not exist, yet', async () => {

        let account = await accounting.create_account('1', 'A');
        expect(account_storage.save_account_called).toBe(true);
        expect(account).toBeInstanceOf(Account);
    });
})
