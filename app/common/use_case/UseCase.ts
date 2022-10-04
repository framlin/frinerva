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


    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }


    _use_case_name;
    _domain_name;
    _presenter: UseCasePresenter | undefined;
    _UseCaseFactory: UseCaseFactory;


}

module.exports = {UseCase};
export {UseCase}