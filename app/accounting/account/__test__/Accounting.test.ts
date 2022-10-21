import {Accounting} from '../Accounting';
import {Account} from "../Account";
import {AccountingHelper} from "../../../common/persistence/helper/AccountingHelper";
import * as fs from "fs";
import path from "path";
import {BookingEntry} from "../BookingEntry";
const ACCOUNT_STORAGE_DIR = path.join(__dirname,"../../../common/persistence/data/account");

describe("Account creation and loading", () => {
    let accounting: Accounting;
    beforeEach(() => {
        accounting = new Accounting(AccountingHelper);
    });

    test('Accounting can create an account', async () => {
        const account = await accounting.create_account('2020-01', '123');
        expect(account).not.toBeNull();
        if (account) {
            expect(account).toBeInstanceOf(Account);
            expect(account.booking_period).toBe('2020-01');
            expect(account.cost_center).toBe('123');
        }
    });


//Accounting can load an account
    test('Accounting can load an account', async () => {
        const account = await accounting.create_account('2020-01', '123');
        expect(account).not.toBeNull();
        if (account) {
            expect(account).toBeInstanceOf(Account);
            expect(account.booking_period).toBe('2020-01');
            expect(account.cost_center).toBe('123');
        }

        const key = "2020-01!123";
        const loaded_account = await accounting.load_account(key);
        expect(loaded_account).not.toBeNull();
        if (loaded_account) {
            expect(loaded_account).toBeInstanceOf(Account);
            expect(loaded_account.booking_period).toBe('2020-01');
            expect(loaded_account.cost_center).toBe('123');
        }
    });


//Accounting can create an account from AccountData
    test('Accounting can create an account from AccountData', async () => {
        const account = await accounting.create_account_from({
            booking_period: '2020-01',
            cost_center: '123',
            booking_entries: []
        });
        expect(account).not.toBeNull();
        if (account) {
            expect(account).toBeInstanceOf(Account);
            expect(account.booking_period).toBe('2020-01');
            expect(account.cost_center).toBe('123');
        }

    });

    afterEach(() => {
        //remove file
        fs.rmSync(path.join(ACCOUNT_STORAGE_DIR,'2020-01'), {force: true, recursive: true});
    });

});

//Accounting can create a booking entry
test('Accounting can create a booking entry', () => {
    const booking_entry = Accounting.create_booking_entry(new Date(), 'subject', 'name', 1, 'code');
    expect(booking_entry).not.toBeNull();
    if (booking_entry) {
        expect(booking_entry).toBeInstanceOf(BookingEntry);
        expect(booking_entry.date).toBeInstanceOf(Date);
        expect(booking_entry.subject).toBe('subject');
        expect(booking_entry.name).toBe('name');
        expect(booking_entry.amount).toBe(1);
        expect(booking_entry.booking_code).toBe('code');
    }
});

//get account names
test.skip('get account names', async () => {
    const accounting = new Accounting(AccountingHelper);
    const account = await accounting.create_account('2020-01', '123');
    expect(account).not.toBeNull();
    if (account) {
        expect(account).toBeInstanceOf(Account);
        expect(account.booking_period).toBe('2020-01');
        expect(account.cost_center).toBe('123');
    }

    const account_names = await accounting.get_account_names();
    expect(account_names).not.toBeNull();
    if (account_names) {
        expect(account_names).toBeInstanceOf(Array);
        expect(account_names.length).toBe(1);
        expect(account_names[0]).toBe('2020-01!123');
    }
});



//
// let accounting: Accounting;
//
// class AccountStorageSpy extends DomainHelper {
//     static account_exists_called = false;
//     static account_exists_params = {booking_period: "", cost_center: ""};
//     static save_account_called = false;
//     static load_account_called = false;
//     static load_account_params = {booking_period: "", cost_center: ""};
//     static accounting: Accounting | undefined;
//
//     static account_exists = (booking_period: string, cost_center: string) => {
//         this.account_exists_params = {booking_period, cost_center};
//         this.account_exists_called = true;
//         return cost_center === "X";
//     }
//
//     static save_account = async () => {
//         this.save_account_called = true;
//     }
//
//     static load_account = async (booking_period: string, cost_center: string) => {
//         this.load_account_called = true;
//         this.load_account_params = {booking_period, cost_center};
//         return {
//             booking_period,
//             cost_center,
//             booking_entries: [1]
//         };
//     }
//
//     static create_account = async () => {
//     }
//
//     static create_virtual_account = async () => {
//     }
// }
//
//
// function reset_AccountStorageSpy() {
//     AccountStorageSpy.account_exists_called = false;
//     AccountStorageSpy.account_exists_params = {booking_period: "", cost_center: ""};
//     AccountStorageSpy.save_account_called = false;
//     AccountStorageSpy.load_account_called = false;
//     AccountStorageSpy.load_account_params = {booking_period: "", cost_center: ""};
// }
//
// beforeEach(() => {
//     reset_AccountStorageSpy()
//     accounting = new Accounting(AccountStorageSpy);
// });
//
//
// describe('create account', () => {
//
//
//     it('returns null, if the account already exists', async () => {
//         let account = await accounting.create_account('1', 'X');
//         expect(account).toBeNull();
//     });
//
//     it('calls save_account, if the account did not exist, yet', async () => {
//         let account = await accounting.create_account('1', 'A');
//         expect(AccountStorageSpy.save_account_called).toBe(true);
//         expect(account).toBeInstanceOf(Account);
//     });
// });
//
// describe('create booking entries', () => {
//     test("create without args", () => {
//         let date = new Date(), subject = "string", name = "string", amount = 0, booking_code = "string";
//         let booking_entry = Accounting.create_booking_entry(date, subject, name, amount, booking_code);
//         expect(booking_entry).toBeInstanceOf(BookingEntry);
//     });
//
//     test('create with args', () => {
//         let date = new Date(2000, 0, 1);
//         let booking_entry = Accounting.create_booking_entry(date, "A", "B", 2.0, "D");
//         expect(booking_entry.subject).toBe("A");
//         expect(booking_entry).toBeInstanceOf(BookingEntry);
//     })
// })
//
// describe('create virtual account', () => {
//     test('virtual accounts will not be saved', async () => {
//         let account = await accounting.create_virtual_account('.', '.');
//         expect(AccountStorageSpy.save_account_called).toBe(false);
//         expect(account).toBeInstanceOf(Account);
//     });
//
//     test('if an Account exists, it will be returned', async () => {
//         let account = await accounting.create_virtual_account('1', 'X');
//         expect(AccountStorageSpy.account_exists_called).toBe(true);
//         expect(AccountStorageSpy.load_account_called).toBe(true);
//         expect(AccountStorageSpy.account_exists_params).toStrictEqual({booking_period: "1", cost_center: "X"});
//         expect(account?.cost_center).toBe('X');
//         expect(account?.booking_period).toBe('1');
//     })
// })
