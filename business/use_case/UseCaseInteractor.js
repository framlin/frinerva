class UseCaseInteractor{
    execute() {}

    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

    _presenter;
}

module.exports = UseCaseInteractor;