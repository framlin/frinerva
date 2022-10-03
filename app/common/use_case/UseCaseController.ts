import {UseCaseInteractor} from "./UseCaseInteractor";
import {UseCase} from "./UseCase";

class UseCaseController{
    execute(...data: any[]) {
        if ( this._interactor) this._interactor.execute(...data)
    }

    forward(use_case_name: string, ... data: any[]){
       if ( this._use_case)  this._use_case.forward(use_case_name, ... data);
    }

    get interactor() {
        return this._interactor;
    }

    set interactor(value) {
        this._interactor = value;
    }

    get use_case() {
        return this._use_case;
    }

    set use_case(value) {
        this._use_case = value;
    }

    _interactor: UseCaseInteractor | undefined;
    _use_case: UseCase | undefined;

}

module.exports = {UseCaseController};
export {UseCaseController}