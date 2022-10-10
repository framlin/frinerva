"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Accounting_1 = require("../Accounting");
const Account_1 = require("../Account");
const BookingEntry_1 = require("../BookingEntry");
const DomainHelper_1 = require("../../../common/domain/DomainHelper");
let accounting, account_storage;
class AccountStorageSpy extends DomainHelper_1.DomainHelper {
    constructor() {
        super(...arguments);
        this.account_exists_called = false;
        this.account_exists_params = { booking_period: "", cost_center: "" };
        this.save_account_called = false;
        this.load_account_called = false;
        this.load_account_params = { booking_period: "", cost_center: "" };
        this.account_exists = (booking_period, cost_center) => {
            this.account_exists_params = { booking_period, cost_center };
            this.account_exists_called = true;
            return cost_center === "X";
        };
        this.save_account = async () => {
            this.save_account_called = true;
        };
        this.load_account = async (booking_period, cost_center) => {
            this.load_account_called = true;
            this.load_account_params = { booking_period, cost_center };
            return {
                booking_period,
                cost_center,
                booking_entries: [1]
            };
        };
    }
}
beforeEach(() => {
    account_storage = new AccountStorageSpy();
    accounting = new Accounting_1.Accounting(AccountStorageSpy);
});
describe('create account', () => {
    it('returns null, if the account already exists', async () => {
        let account = await accounting.create_account('1', 'X');
        expect(account).toBeNull();
    });
    it('calls save_account, if the account did not exist, yet', async () => {
        let account = await accounting.create_account('1', 'A');
        expect(account_storage.save_account_called).toBe(true);
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
        expect(account_storage.save_account_called).toBe(false);
        expect(account).toBeInstanceOf(Account_1.Account);
    });
    test('if an Account exists, it will be returned', async () => {
        let account = await accounting.create_virtual_account('1', 'X');
        expect(account_storage.account_exists_called).toBe(true);
        expect(account_storage.load_account_called).toBe(true);
        expect(account_storage.account_exists_params).toStrictEqual({ booking_period: "1", cost_center: "X" });
        expect(account?.cost_center).toBe('X');
        expect(account?.booking_period).toBe('1');
    });
});
//# sourceMappingURL=Accounting.test.js.map