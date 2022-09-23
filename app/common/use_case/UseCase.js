class UseCase{

    constructor(UseCaseFactory, domain_name, use_case_name) {
        this._UseCaseFactory = UseCaseFactory;
        this._use_case_name = use_case_name;
        this._domain_name = domain_name;
    }

    execute() {
        this._presenter.execute(this._use_case_name);
        // this.view.show();
        // ==> view.presenter.ready
        // ==> presenter.controller.execute()
        // ==> controller.interactor.execute()
    }

    forward(use_case_name) {
        this._UseCaseFactory.create(use_case_name).execute();
    }

    get interactor() {
        return this._interactor;
    }

    set interactor(value) {
        this._interactor = value;
    }

    get controller() {
        return this._controller;
    }

    set controller(value) {
        this._controller = value;
    }

    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

    get helper() {
        return this._helper;
    }

    set helper(value) {
        this._helper = value;
    }


    _use_case_name;
    _domain_name;
    _interactor;
    _controller;
    _helper;
    _presenter;
    _UseCaseFactory;


}

module.exports = UseCase;