"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Accounting_1 = require("../Accounting");
const Account_1 = require("../Account");
const BookingEntry_1 = require("../BookingEntry");
const DomainHelper_1 = require("../../../common/domain/DomainHelper");
let accounting;
class AccountStorageSpy extends DomainHelper_1.DomainHelper {
}
_a = AccountStorageSpy;
AccountStorageSpy.account_exists_called = false;
AccountStorageSpy.account_exists_params = { booking_period: "", cost_center: "" };
AccountStorageSpy.save_account_called = false;
AccountStorageSpy.load_account_called = false;
AccountStorageSpy.load_account_params = { booking_period: "", cost_center: "" };
AccountStorageSpy.account_exists = (booking_period, cost_center) => {
    _a.account_exists_params = { booking_period, cost_center };
    _a.account_exists_called = true;
    return cost_center === "X";
};
AccountStorageSpy.save_account = async () => {
    _a.save_account_called = true;
};
AccountStorageSpy.load_account = async (booking_period, cost_center) => {
    _a.load_account_called = true;
    _a.load_account_params = { booking_period, cost_center };
    return {
        booking_period,
        cost_center,
        booking_entries: [1]
    };
};
AccountStorageSpy.create_account = async () => {
};
AccountStorageSpy.create_virtual_account = async () => {
};
function reset_AccountStorageSpy() {
    AccountStorageSpy.account_exists_called = false;
    AccountStorageSpy.account_exists_params = { booking_period: "", cost_center: "" };
    AccountStorageSpy.save_account_called = false;
    AccountStorageSpy.load_account_called = false;
    AccountStorageSpy.load_account_params = { booking_period: "", cost_center: "" };
}
beforeEach(() => {
    reset_AccountStorageSpy();
    accounting = new Accounting_1.Accounting(AccountStorageSpy);
});
describe('create account', () => {
    it('returns null, if the account already exists', async () => {
        let account = await accounting.create_account('1', 'X');
        expect(account).toBeNull();
    });
    it('calls save_account, if the account did not exist, yet', async () => {
        let account = await accounting.create_account('1', 'A');
        expect(AccountStorageSpy.save_account_called).toBe(true);
        expect(account).toBeInstanceOf(Account_1.Account);
    });
});
describe('create booking entries', () => {
    test("create without args", () => {
        let date = new Date(), subject = "string", name = "string", amount = 0, booking_code = "string";
        let booking_entry = Accounting_1.Accounting.create_booking_entry(date, subject, name, amount, booking_code);
        expect(booking_entry).toBeInstanceOf(BookingEntry_1.BookingEntry);
    });
    test('create with args', () => {
        let date = new Date(2000, 0, 1);
        let booking_entry = Accounting_1.Accounting.create_booking_entry(date, "A", "B", 2.0, "D");
        expect(booking_entry.subject).toBe("A");
        expect(booking_entry).toBeInstanceOf(BookingEntry_1.BookingEntry);
    });
});
describe('create virtual account', () => {
    test('virtual accounts will not be saved', async () => {
        let account = await accounting.create_virtual_account('.', '.');
        expect(AccountStorageSpy.save_account_called).toBe(false);
        expect(account).toBeInstanceOf(Account_1.Account);
    });
    test('if an Account exists, it will be returned', async () => {
        let account = await accounting.create_virtual_account('1', 'X');
        expect(AccountStorageSpy.account_exists_called).toBe(true);
        expect(AccountStorageSpy.load_account_called).toBe(true);
        expect(AccountStorageSpy.account_exists_params).toStrictEqual({ booking_period: "1", cost_center: "X" });
        expect(account?.cost_center).toBe('X');
        expect(account?.booking_period).toBe('1');
    });
});
//# sourceMappingURL=Accounting.test.js.map