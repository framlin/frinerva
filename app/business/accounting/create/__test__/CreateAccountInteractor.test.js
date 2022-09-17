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
    load_booking_period_configuration_called;

    save_account_called;
    save_account_arguments;

    async load_cost_center_configuration() {
        this.load_cost_center_configuration_called = true;
        return Promise.resolve("{\"TEST\": \"test\"}");
    }

    async load_booking_period_configuration() {
        this.load_booking_period_configuration_called = true;
        return Promise.resolve("[1]");
    }

    async save_account(account_path, account_json) {

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

    let nix = await create_account_interactor.execute();
        expect(presenter.show_cost_center_list_called).toBe(true);
        expect(presenter.show_cost_center_list_params).toStrictEqual({"TEST": "test"});

        expect(presenter.show_booking_period_list_called).toBe(true);
        expect(presenter.show_booking_period_list_params).toStrictEqual([1]);

        expect(helper.load_cost_center_configuration_called).toBe(true);
        expect(helper.load_booking_period_configuration_called).toBe(true);

});

describe('period_cost_center_selection', () => {
    beforeEach(() => {
        create_account_interactor = new CreateAccountInteractor();
        create_account_interactor.presenter = presenter;
    })

    test('period_cost_center_selection - empty selection', () => {
        let period_cost_center = {periods: [], accounts: []};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect(presenter.show_new_accounts_list_called).toBe(true);
        expect(presenter.show_new_accounts_list_arguments).toStrictEqual([]);
    });


    test('period_cost_center_selection - one each', () => {
        let period_cost_center = {periods: [1], accounts: [{key: 'A', label: 'a'}]};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect(presenter.show_new_accounts_list_called).toBe(true);
        expect(presenter.show_new_accounts_list_arguments).toStrictEqual([{period: 1, cost_center: 'A', label: 'a'}]);
    });

    test('period_cost_center_selection - 2 : 1', () => {
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
});

describe('create', () => {
    beforeEach(() => {
        create_account_interactor = new CreateAccountInteractor();
        create_account_interactor.presenter = presenter;
    });

    test('empty result', () => {
        create_account_interactor.create([]);

    })
});
