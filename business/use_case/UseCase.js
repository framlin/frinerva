class UseCase{

    execute() {
        this.view.show();
        // ==> vie.presenter.ready
        // ==> presenter.controller.execute()
        // ==> controller.interactor.execute()
    }

    get view() {
        return this._view;
    }

    set view(value) {
        this._view = value;
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


    _interactor;
    _controller;
    _helper;
    _presenter;
    _view;


}

module.exports = UseCase;