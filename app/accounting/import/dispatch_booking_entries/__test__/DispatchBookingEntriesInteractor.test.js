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

describe('account_map_creation', () => {
    beforeEach(() => {
        interactor = new DispatchBookingEntriesInteractor();
    });

    test('empty booking-records => empty account-map', () => {
        let account_dict = interactor.create_account_dict([]);
        expect(account_dict).toStrictEqual({});
    });

    test('one booking-record => account-map with one entry', () => {
        let account_dict = interactor.create_account_dict([{booking_entry:1, cost_center: "A", year: "1"}]);

        expect(account_dict).toStrictEqual({"1!A":1});

    });
});