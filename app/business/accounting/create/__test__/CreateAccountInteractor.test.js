const CreateAccountInteractor = require('../CreateAccountInteractor');

let create_account_interactor;

class PresenterSpy {
    show_cost_center_list_called;
    show_cost_center_list_params;

    show_booking_period_list_called;
    show_booking_period_list_params;

    show_new_accounts_list_called;
    show_new_accounts_list_arguments;

    show_cost_center_list(cs_list) {
        this.show_cost_center_list_called = true;
        this.show_cost_center_list_params = cs_list;
    }

    show_booking_period_list(bp_list) {
        this.show_booking_period_list_called = true;
        this.show_booking_period_list_params = bp_list;
    }

    show_new_accounts_list(new_accounts_list) {
        this.show_new_accounts_list_called = true;
        this.show_new_accounts_list_arguments = new_accounts_list;
    }
}

let presenter = new PresenterSpy();

class HelperSpy {
    load_cost_center_configuration_called;

    async load_cost_center_configuration() {
        this.load_cost_center_configuration_called = true;
        return new Promise((resolve) => {
            return {"TEST": "test"}
        });
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
});

//
test('period_cost_center_selection - empty selection', () => {
    create_account_interactor.presenter = presenter;
    let period_cost_center = {periods: [], accounts: []};
    create_account_interactor.period_cost_center_selection(period_cost_center);

    expect(presenter.show_new_accounts_list_called).toBe(true);
    expect(presenter.show_new_accounts_list_arguments).toStrictEqual([]);
});


test('period_cost_center_selection - one each', () => {
    create_account_interactor.presenter = presenter;
    let period_cost_center = {periods: [1], accounts: [{key: 'A', label: 'a'}]};
    create_account_interactor.period_cost_center_selection(period_cost_center);

    expect(presenter.show_new_accounts_list_called).toBe(true);
    expect(presenter.show_new_accounts_list_arguments).toStrictEqual([{period: 1, cost_center: 'A', label: 'a'}]);
});

test('period_cost_center_selection - 2 : 1', () => {
    create_account_interactor.presenter = presenter;
    let period_cost_center = {
        periods: [1, 2],
        accounts: [{key: 'A', label: 'a'}]
    };
    create_account_interactor.period_cost_center_selection(period_cost_center);

    expect(presenter.show_new_accounts_list_called).toBe(true);
    expect(presenter.show_new_accounts_list_arguments).toStrictEqual([
        {period: 1, cost_center: 'A', label: 'a'},
        {period: 2, cost_center: 'A', label: 'a'}
    ]);
});

test('period_cost_center_selection - 1 : 2', () => {
    create_account_interactor.presenter = presenter;
    let period_cost_center = {
        periods: [1],
        accounts: [
            {key: 'A', label: 'a'},
            {key: 'B', label: 'b'}
        ]
    };
    create_account_interactor.period_cost_center_selection(period_cost_center);

    expect(presenter.show_new_accounts_list_called).toBe(true);
    expect(presenter.show_new_accounts_list_arguments).toStrictEqual([
        {period: 1, cost_center: 'A', label: 'a'},
        {period: 1, cost_center: 'B', label: 'b'}
    ]);
});
