const {DispatchBookingEntriesInteractor} = require('../DispatchBookingEntriesInteractor');
const {Account} = require("../../../account/Account");

let interactor;

class PresenterSpy{
    show_called;
    show_params;
    show(params) {
        this.show_called = true;
        this.show_params = params;
    }

}
class HelperSpy {
    booking_entries;
    account_exists (booking_period, cost_center) {
        return cost_center !== 'X';
    }
    load_account(booking_period, cost_center) {
        let result = new Account(booking_period, cost_center);
        if (this.booking_entries) {
            result.booking_entries = this.booking_entries
        }
        return result;
    }
}


beforeEach(() => {
    interactor = new DispatchBookingEntriesInteractor();
});

test('creation', () => {
    expect(interactor).toBeInstanceOf(DispatchBookingEntriesInteractor);
});

describe.skip('execute', () => {
    //extract all booking_records
    //put them into virtual accounts
    //display the virtual accounts


    beforeEach(() => {
        let presenter = new PresenterSpy();
        let helper = new HelperSpy();

        interactor = new DispatchBookingEntriesInteractor();
        interactor.presenter = presenter;
        interactor.helper = helper;
    });

});

describe('account-dict-creation', () => {

    function expect_account_dict(booking_entries, expected_dict) {
        let given_booking_entries = [];
        for (let be of booking_entries) {
            given_booking_entries.push({year:be[0], cost_center:be[1], booking_entry:be[2]});
        }
        let account_dict = interactor.create_account_dict(given_booking_entries);
        expect(account_dict).toStrictEqual(expected_dict);
    }

    beforeEach(() => {
        interactor = new DispatchBookingEntriesInteractor();
    });

    test('empty booking-records => empty account-dict', () => {
        expect_account_dict([], {})
    });

    test('one booking-record => account-dict with one entry', () => {
        expect_account_dict([[1,"A",1]], {"1!A":[1]});
    });

    test('many booking-records with different cost-centers => account-dict with many different keys', () => {
        let booking_entries = [
            [1,"A",1],
            [1,"B",1]
        ];
        let expected_dict = {"1!A":[1], "1!B":[1]}
        expect_account_dict(booking_entries, expected_dict);
    });

    test('many booking-records with different years => account-dict with many different keys', () => {
        let booking_entries = [
            [1,"A",1],
            [2,"A",1]
        ];
        let expected_dict = {"1!A":[1], "2!A":[1]}
        expect_account_dict(booking_entries, expected_dict);
    });

    test('many totally different booking-records => account-dict with many different keys', () => {
        let booking_entries = [
            [1,"A",2],
            [3,"B",4]
        ];
        let expected_dict = {"1!A":[2], "3!B":[4]}
        expect_account_dict(booking_entries, expected_dict);
    });

    test('two booking-records, with same cc/year => two account-dict-entries with one key', () => {
        let booking_entries = [
            [1,"A",1],
            [1,"A",2]
        ];
        let expected_dict = {"1!A":[1,2]}
        expect_account_dict(booking_entries, expected_dict);
    });
});

describe('virtual-accounts-creation', () => {
    beforeEach(() => {
        interactor = new DispatchBookingEntriesInteractor();
        interactor.helper = new HelperSpy();
    });

    test('empty dict => empty accounts-list', async () => {
        let virtual_accounts = await interactor.create_virtual_accounts({});
        expect(virtual_accounts).toStrictEqual([]);
    });

    test('dict with one empty account => account without booking_entries', async () => {
        let virtual_accounts = await interactor.create_virtual_accounts({"1!A":[]});
        expect(virtual_accounts.length).toBe(1);
        expect(virtual_accounts[0]).toBeInstanceOf(Account);
        expect(virtual_accounts[0].booking_period).toBe("1");
        expect(virtual_accounts[0].cost_center).toBe("A");
        expect(virtual_accounts[0].booking_entries.length).toBe(0);
    });

    test('dict with one NEW account with entries => account with same booking_entries', async () => {
        let virtual_accounts = await interactor.create_virtual_accounts({"1!A":[1]});
        expect(virtual_accounts.length).toBe(1);
        expect(virtual_accounts[0]).toBeInstanceOf(Account);
        expect(virtual_accounts[0].booking_period).toBe("1");
        expect(virtual_accounts[0].cost_center).toBe("A");
        expect(virtual_accounts[0].booking_entries.length).toBe(1);
        expect(virtual_accounts[0].booking_entries[0]).toBe(1);

    })

    test('dict with one existing account with entries => account with booking_entries from both', async () => {
        interactor.helper.booking_entries = [2];
        let virtual_accounts = await interactor.create_virtual_accounts({"1!A":[1]});
        expect(virtual_accounts.length).toBe(1);
        expect(virtual_accounts[0]).toBeInstanceOf(Account);
        expect(virtual_accounts[0].booking_period).toBe("1");
        expect(virtual_accounts[0].cost_center).toBe("A");
        expect(virtual_accounts[0].booking_entries.length).toBe(2);
    });

    test('dict with two accounts => two accounts', async() => {
        let virtual_accounts = await interactor.create_virtual_accounts({"1!A":[1], "2!B":[1]});
        expect(virtual_accounts.length).toBe(2);
        expect(virtual_accounts[1]).toBeInstanceOf(Account);
        expect(virtual_accounts[0].booking_period).toBe("1");
        expect(virtual_accounts[1].cost_center).toBe("B");
        expect(virtual_accounts[1].booking_entries.length).toBe(1);

    })

})