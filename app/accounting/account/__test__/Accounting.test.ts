import {AccountingHelper} from "../../../common/persistence/helper/AccountingHelper";
import {Account} from "../Account";
import {Accounting} from '../Accounting';
import {BookingEntry} from "../BookingEntry";

function mock_accounting_helper() {
    jest.spyOn(AccountingHelper, 'account_exists')
        .mockImplementation(() => false);

    jest.spyOn(AccountingHelper, 'save_account')
        .mockImplementation(() => Promise.resolve());

    jest.spyOn(AccountingHelper, 'load_account')
        .mockImplementation(() => Promise.resolve(new Account("2020-01", "123")));

    jest.spyOn(AccountingHelper, 'get_account_name_list')
        .mockImplementation(() => Promise.resolve([{booking_period: '2020-01', cost_center: '123'}]));

    jest.spyOn(AccountingHelper, 'load_cost_center_configuration')
        .mockImplementation(() => Promise.resolve('{\"123\": \"test\"}'));
}

let accounting: Accounting;
beforeEach(() => {
    mock_accounting_helper();
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

test('get account names', async () => {
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
        expect(account_names[0]).toStrictEqual({
            "account_name": "2020-01 - test",
            "key": "2020-01!123"
        });
    }
});

test('Accounting can create a virtual account, if it does not exist', async () => {
    const account = await accounting.create_virtual_account('2020-01', 'DOES NOT EXIST');
    expect(account).not.toBeNull();
    if (account) {
        expect(account).toBeInstanceOf(Account);
        expect(account.booking_period).toBe('2020-01');
        expect(account.cost_center).toBe('DOES NOT EXIST');
    }
});

test('Accounting can create a virtual account, if it already exists', async () => {

    jest.spyOn(AccountingHelper, 'account_exists')
        .mockImplementation(() => true);

    const accounting = new Accounting(AccountingHelper);
    const account = await accounting.create_virtual_account('2020-01', '123');
    expect(account).not.toBeNull();
    if (account) {
        expect(account).toBeInstanceOf(Account);
        expect(account.booking_period).toBe('2020-01');
        expect(account.cost_center).toBe('123');
    }
});