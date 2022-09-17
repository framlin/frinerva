const CreateAccountInteractor = require('../CreateAccountInteractor');

let create_account_interactor;

class PresenterSpy {
    show_cost_center_list_called;
    show_cost_center_list_params;

    show_booking_period_list_called;
    show_booking_period_list_params;

    show_cost_center_list(cs_list) {
        this.show_cost_center_list_called = true;
        this.show_cost_center_list_params = cs_list;
    }

    show_booking_period_list(bp_list) {
        this.show_booking_period_list_called = true;
        this.show_booking_period_list_params = bp_list;
    }
}
let presenter = new PresenterSpy();

class HelperSpy {
    load_cost_center_configuration_called;
    async load_cost_center_configuration() {
        this.load_cost_center_configuration_called = true;
        return  new Promise((resolve) => {return {"TEST": "test"}});
    }
}
let helper = new HelperSpy();

beforeEach(() => {
    create_account_interactor = new CreateAccountInteractor();
})

test('creation', () => {
    expect(create_account_interactor).toBeInstanceOf(CreateAccountInteractor);
});

test('execute', async () => {
    create_account_interactor.presenter = presenter;
    create_account_interactor.helper = helper;
    create_account_interactor.execute().then(() => {
        expect(presenter.show_cost_center_list_called).toBe(true);
        expect(presenter.show_cost_center_list_params).toStrictEqual({"TEST": "test"});
        expect(presenter.show_booking_period_list_called).toBe(true);
        expect(presenter.show_booking_period_list_params).toStrictEqual({"TEST": "test"});
    });
})