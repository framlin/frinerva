class UseCaseController{
    execute(...data) {
        this._interactor.execute(...data)
    }

    forward(use_case_name, ... data){
        this._use_case.forward(use_case_name, ... data);
    }

    get interactor() {
        return this._interactor;
    }

    set interactor(value) {
        this._interactor = value;
    }

    _interactor;
    _use_case;

    get use_case() {
        return this._use_case;
    }

    set use_case(value) {
        this._use_case = value;
    }
}

module.exports = UseCaseController;