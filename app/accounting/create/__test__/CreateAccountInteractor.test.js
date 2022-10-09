const {CreateAccountInteractor} = require('../CreateAccountInteractor');
const {Account} = require("../../account/Account");

let create_account_interactor;

class PresenterSpy {
    show_error_called;
    show_error_params;

    show_cost_center_list_called;
    show_cost_center_list_params;

    show_booking_period_list_called;
    show_booking_period_list_params;

    show_new_accounts_list_called;
    show_new_accounts_list_params;

    account_creation_done_called;

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
        this.show_new_accounts_list_params = new_accounts_list;
    }

    show_error(error_msg) {
        this.show_error_called = true;
        this.show_error_params = error_msg;
    }

    account_creation_done() {
        this.account_creation_done_called = true;
    }

}

let response_boundary = new PresenterSpy();

class HelperSpy {
    load_account_called;
    load_account_ctr = 0;
    load_account_params = [];

    account_exists_called;
    save_account_ctr = 0;
    save_account_params = [];

    account_exists_called;
    account_exists_ctr = 0;
    account_exists_params = [];

    load_cost_center_configuration_called;
    load_booking_period_configuration_called;

    async load_cost_center_configuration() {
        this.load_cost_center_configuration_called = true;
        return Promise.resolve("{\"TEST\": \"test\"}");
    }

    async load_booking_period_configuration() {
        this.load_booking_period_configuration_called = true;
        return Promise.resolve("[1]");
    }
    
    async load_account(booking_period, cost_center) {
        this.load_account_called = true;
        this.load_account_ctr++;
        this.load_account_params.push({booking_period, cost_center});
        let result = this.load_account.result;
        return Promise.resolve(result);
    }

    async save_account(account) {
        this.save_account_called = true;
        this.save_account_ctr++;
        this.save_account_params.push(account);
    }

    account_exists(booking_period, cost_center) {
        this.account_exists_called = true;
        this.account_exists_ctr++;
        this.account_exists_params.push({booking_period, cost_center});
        if (cost_center === "X"){
            return true;
        } else {
            return this.account_exists.result;

        }
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
    create_account_interactor.response_boundary = response_boundary;
    create_account_interactor.helper = helper;

    await create_account_interactor.execute();
    expect(create_account_interactor.response_boundary.show_cost_center_list_called).toBe(true);
    expect(create_account_interactor.response_boundary.show_cost_center_list_params).toStrictEqual({"TEST": "test"});

    expect(create_account_interactor.response_boundary.show_booking_period_list_called).toBe(true);
    expect(create_account_interactor.response_boundary.show_booking_period_list_params).toStrictEqual([1]);

    expect(create_account_interactor.helper.load_cost_center_configuration_called).toBe(true);
    expect(create_account_interactor.helper.load_booking_period_configuration_called).toBe(true);

});

describe('period_cost_center_selection', () => {
    beforeEach(() => {
        create_account_interactor = new CreateAccountInteractor();
        create_account_interactor.response_boundary = new PresenterSpy();
        create_account_interactor.helper = new HelperSpy();
    })

    function expect_empty_result() {
        expect(create_account_interactor.response_boundary.show_new_accounts_list_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_new_accounts_list_params).toStrictEqual([]);
    }

    test('period_cost_center_selection - 0 : 0', () => {
        let period_cost_center = {periods: [], accounts: []};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect_empty_result();
    });


    test('period_cost_center_selection - 1 : 0', () => {
        let period_cost_center = {periods: [1], accounts: []};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect_empty_result();
    });

    test('period_cost_center_selection - 0 : 1', () => {
        let period_cost_center = {periods: [], accounts: [{key: 'A', label: 'a'}]};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect_empty_result();
    });


    test('period_cost_center_selection - 1 : 1', () => {
        let period_cost_center = {periods: [1], accounts: [{key: 'A', label: 'a'}]};
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect(create_account_interactor.response_boundary.show_new_accounts_list_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_new_accounts_list_params).toStrictEqual([{booking_period: 1, cost_center: 'A', label: 'a'}]);
    });

    test('period_cost_center_selection - 2 : 1', () => {
        let period_cost_center = {
            periods: [1, 2],
            accounts: [{key: 'A', label: 'a'}]
        };
        create_account_interactor.period_cost_center_selection(period_cost_center);

        expect(create_account_interactor.response_boundary.show_new_accounts_list_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_new_accounts_list_params).toStrictEqual([
            {booking_period: 1, cost_center: 'A', label: 'a'},
            {booking_period: 2, cost_center: 'A', label: 'a'}
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

        expect(create_account_interactor.response_boundary.show_new_accounts_list_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_new_accounts_list_params).toStrictEqual([
            {booking_period: 1, cost_center: 'A', label: 'a'},
            {booking_period: 1, cost_center: 'B', label: 'b'}
        ]);
    });
});

describe('create', () => {
    /*
    if empty -> nothing
    else FOR_ALL:
    check if account already exists
    .. get account-list
    if exists -> error-message
    else -> create new empty account
    .. create account
    .. save account
     */


    beforeEach(() => {
        create_account_interactor = new CreateAccountInteractor();
        create_account_interactor.response_boundary = new PresenterSpy();
        create_account_interactor.helper = new HelperSpy();
    });

    test('empty result-list does nothing', async () => {
        await create_account_interactor.create([], UseCaseFactory.Observatory);
        expect(create_account_interactor.helper.load_account_called).toBeUndefined()
    });

    test('one existing account gets error', async () => {
        let params = {booking_period: '1', cost_center: "A"};
        create_account_interactor.helper.account_exists.result = true;
        await create_account_interactor.create([params], UseCaseFactory.Observatory);
        expect(create_account_interactor.helper.account_exists_called).toBe(true);
        expect(create_account_interactor.helper.account_exists_params[0]).toStrictEqual(params);
        expect(create_account_interactor.response_boundary.show_error_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_error_params).toStrictEqual({"booking_period": "1", "cost_center": "A", "error": "ACCOUNT_EXIST"});
    });

    test('one new account will be stored', async () => {
        let params = {booking_period: '1', cost_center: "A"};
        create_account_interactor.helper.account_exists.result = false;
        await create_account_interactor.create([params], UseCaseFactory.Observatory);
        expect(create_account_interactor.helper.account_exists_called).toBe(true);
        expect(create_account_interactor.helper.account_exists_params[0]).toStrictEqual(params);
        expect(create_account_interactor.response_boundary.show_error_called).toBeUndefined();
        expect(create_account_interactor.helper.save_account_called).toBe(true);
        expect(create_account_interactor.helper.save_account_params[0]).toBeInstanceOf(Account);
        expect(create_account_interactor.helper.save_account_params[0].booking_period).toBe(params.booking_period);
        expect(create_account_interactor.helper.save_account_params[0].cost_center).toBe(params.cost_center);
        expect(create_account_interactor.response_boundary.account_creation_done_called).toBe(true);
    });

    test('one new account will be stored, one existing gets error', async () => {
        let params = [{booking_period: '1', cost_center: "A"}, {booking_period: '1', cost_center: "X"}];
        create_account_interactor.helper.account_exists.result = false;
        await create_account_interactor.create(params, UseCaseFactory.Observatory);
        expect(create_account_interactor.helper.account_exists_ctr).toBe(2);
        expect(create_account_interactor.helper.save_account_ctr).toBe(1);
        expect(create_account_interactor.response_boundary.show_error_called).toBe(true);
        expect(create_account_interactor.response_boundary.show_error_params).toStrictEqual({"booking_period": "1", "cost_center": "X", "error": "ACCOUNT_EXIST"});
    });
});
