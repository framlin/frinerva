import {UseCasePresenter} from "./UseCasePresenter";
import {UseCaseHelper} from "./UseCaseHelper";

class UseCaseInteractor{
    get helper() {
        return this._helper;
    }

    set helper(value) {
        this._helper = value;
    }
    execute(...data: any[]) {}

    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

    _presenter: UseCasePresenter | undefined;
    _helper: UseCaseHelper | undefined;
}

module.exports = UseCaseInteractor;
export {UseCaseInteractor}