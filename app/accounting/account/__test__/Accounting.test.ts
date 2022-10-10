import {Accounting} from '../Accounting';
import {Account} from "../Account";
import {BookingEntry} from "../BookingEntry";
import {DomainHelper} from "../../../common/domain/DomainHelper";

let accounting: Accounting;

class AccountStorageSpy extends DomainHelper {
    static account_exists_called = false;
    static account_exists_params = {booking_period: "", cost_center: ""};
    static save_account_called = false;
    static load_account_called = false;
    static load_account_params = {booking_period: "", cost_center: ""};
    static accounting: Accounting | undefined;

    static account_exists = (booking_period: string, cost_center: string) => {
        this.account_exists_params = {booking_period, cost_center};
        this.account_exists_called = true;
        return cost_center === "X";
    }

    static save_account = async () => {
        this.save_account_called = true;
    }

    static load_account = async (booking_period: string, cost_center: string) => {
        this.load_account_called = true;
        this.load_account_params = {booking_period, cost_center};
        return {
            booking_period,
            cost_center,
            booking_entries: [1]
        };
    }

    static create_account = async () => {
    }

    static create_virtual_account = async () => {
    }
}


function reset_AccountStorageSpy() {
    AccountStorageSpy.account_exists_called = false;
    AccountStorageSpy.account_exists_params = {booking_period: "", cost_center: ""};
    AccountStorageSpy.save_account_called = false;
    AccountStorageSpy.load_account_called = false;
    AccountStorageSpy.load_account_params = {booking_period: "", cost_center: ""};
}

beforeEach(() => {
    reset_AccountStorageSpy()
    accounting = new Accounting(AccountStorageSpy);
});


describe('create account', () => {


    it('returns null, if the account already exists', async () => {
        let account = await accounting.create_account('1', 'X');
        expect(account).toBeNull();
    });

    it('calls save_account, if the account did not exist, yet', async () => {
        let account = await accounting.create_account('1', 'A');
        expect(AccountStorageSpy.save_account_called).toBe(true);
        expect(account).toBeInstanceOf(Account);
    });
});

describe('create booking entries', () => {
    test("create without args", () => {
        let date = new Date(), subject = "string", name = "string", amount = 0, booking_code = "string";
        let booking_entry = Accounting.create_booking_entry(date, subject, name, amount, booking_code);
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
        expect(AccountStorageSpy.save_account_called).toBe(false);
        expect(account).toBeInstanceOf(Account);
    });

    test('if an Account exists, it will be returned', async () => {
        let account = await accounting.create_virtual_account('1', 'X');
        expect(AccountStorageSpy.account_exists_called).toBe(true);
        expect(AccountStorageSpy.load_account_called).toBe(true);
        expect(AccountStorageSpy.account_exists_params).toStrictEqual({booking_period: "1", cost_center: "X"});
        expect(account?.cost_center).toBe('X');
        expect(account?.booking_period).toBe('1');
    })

})
