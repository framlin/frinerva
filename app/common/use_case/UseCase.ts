import {UseCaseInteractor} from "./UseCaseInteractor";
import {UseCaseController} from "./UseCaseController";
import {UseCaseHelper} from "./UseCaseHelper";
import {UseCasePresenter} from "./UseCasePresenter";
import {UseCaseFactory} from "../../accounting/factories/UseCaseFactory";

class UseCase{

    constructor(UseCaseFactory: UseCaseFactory, domain_name: string, use_case_name: string) {
        this._UseCaseFactory = UseCaseFactory;
        this._use_case_name = use_case_name;
        this._domain_name = domain_name;
    }

    execute(...data: any[]) {
        if (this._presenter) this._presenter.execute(this._use_case_name, ...data);
        // this.view.show();
        // ==> view.presenter.ready
        // ==> presenter.controller.execute()
        // ==> controller.interactor.execute()
    }

    forward(use_case_name: string,...data: any[]) {
        //@ts-ignore
        this._UseCaseFactory.create(use_case_name).execute(...data);
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
    _interactor: UseCaseInteractor | undefined;
    _controller: UseCaseController | undefined;
    _helper: UseCaseHelper | undefined;
    _presenter: UseCasePresenter | undefined;
    _UseCaseFactory: UseCaseFactory;


}

module.exports = UseCase;
export {UseCase}