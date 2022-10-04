const {ShowListInteractor} = require("../ShowListInteractor");
let interactor;

class PresenterSpy{
    show_called;
    show_params;
    show(params) {
        this.show_called = true;
        this.show_params = params;
    }

}
let response_boundary = new PresenterSpy();

class HelperSpy {
    get_account_name_list_called;
    get_account_name_list() {
        this.get_account_name_list_called = true;
        return [{booking_period: '1', cost_center:'A'}];
    }

    async load_cost_center_configuration() {
        return Promise.resolve("{\"A\": \"a\"}");
    }
}
let helper = new HelperSpy();

beforeEach(() => {
    interactor = new ShowListInteractor()
})

test('creation', () => {
    expect(interactor).toBeInstanceOf(ShowListInteractor);
});

test('execute', async () => {
    interactor.response_boundary = response_boundary;
    interactor.helper = helper;

    await interactor.execute();
    expect(interactor.helper.get_account_name_list_called).toBe(true);
    expect(interactor.response_boundary.show_called).toBe(true);
    expect(interactor.response_boundary.show_params).toStrictEqual(['1 - a']);
});
