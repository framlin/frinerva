class UseCaseInteractor{
    get helper() {
        return this._helper;
    }

    set helper(value) {
        this._helper = value;
    }
    execute() {}

    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

    _presenter;
    _helper;
}

module.exports = UseCaseInteractor;