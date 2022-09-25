const DispatchBookingEntriesInteractor = require('../DispatchBookingEntriesInteractor');

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

describe('account_dict_creation', () => {

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