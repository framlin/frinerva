const {Accounting} = require('../Accounting');
const {Account} = require("../Account");
const {BookingEntry} = require("../BookingEntry");

let accounting,
    account_storage;

class AccountStorageSpy {
    account_exists_called;
    account_exists_params;
    save_account_called = false;
    load_account_called;
    load_account_params;
    accounting;

    account_exists = (booking_period, cost_center) => {
        this.account_exists_params = {booking_period, cost_center};
        this.account_exists_called = true;
        return cost_center === "X";
    }

    save_account = async () => {
        this.save_account_called = true;
    }

    load_account = async (booking_period, cost_center) => {
        this.load_account_called = true;
        this.load_account_params = {booking_period, cost_center};
        return {
            booking_period,
            cost_center,
            booking_entries: [1]
        };
    }
}

beforeEach(() => {
    account_storage = new AccountStorageSpy();
    accounting = new Accounting(account_storage);
});


describe('create account', () => {


    it('returns null, if the account already exists', async () => {
        let account = await accounting.create_account('1', 'X');
        expect(account).toBeNull();
    });

    it('calls save_account, if the account did not exist, yet', async () => {
        let account = await accounting.create_account('1', 'A');
        expect(account_storage.save_account_called).toBe(true);
        expect(account).toBeInstanceOf(Account);
    });
});

describe('create booking entries', () => {
    test("create without args", () => {
        let booking_entry = Accounting.create_booking_entry();
        expect(booking_entry).toBeInstanceOf(BookingEntry);
    });

    test('create with args', () => {
        let date = new Date(2000, 0, 1);
        let booking_entry = Accounting.create_booking_entry(date, "A", "B", 2.0, "D");
        expect(booking_entry.subject).toBe("A");
        expect(booking_entry).toBeInstanceOf(BookingEntry);
    })
})

describe('create virtual account', () => {
    test('virtual accounts will not be saved', async () => {
        let account = await accounting.create_virtual_account('.', '.');
        expect(account_storage.save_account_called).toBe(false);
        expect(account).toBeInstanceOf(Account);
    });

    test('if an Account exists, it will be returned', async () => {
        let account = await accounting.create_virtual_account('1', 'X');
        expect(account_storage.account_exists_called).toBe(true);
        expect(account_storage.load_account_called).toBe(true);
        expect(account_storage.account_exists_params).toStrictEqual({booking_period: "1", cost_center: "X"});
        expect(account.cost_center).toBe('X');
        expect(account.booking_period).toBe('1');
    })

})
