import {UseCaseName} from "./UseCaseName";
import {UseCasePresenter} from "./UseCasePresenter";
import {UseCaseFactory} from "../factories/UseCaseFactory";

export class UseCase{

    constructor(
        protected _useCaseFactory: UseCaseFactory,
        protected _presenter: UseCasePresenter,
        protected _use_case_name?: UseCaseName,
        protected _domain_name?: string
    ) {}

    execute(...data: any[]) {
        if (this._presenter) this._presenter.execute(this._use_case_name, ...data);
    }

    forward(use_case_name: UseCaseName, ...data: any[]) {
        this._useCaseFactory.create(use_case_name).execute(...data);
    }


    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

    get use_case_name() {
        return this._use_case_name;
    }

    get domain_name() {
        return this._domain_name;
    }

}
