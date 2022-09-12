class UseCaseView{

    forward(use_case_name) {
        this._presenter.forward(use_case_name);
    }

    _presenter;
    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }
}

module.exports = UseCaseView;