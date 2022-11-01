import {UseCasePresenter} from "./UseCasePresenter";
import {UseCaseFactory} from "../../accounting/factories/UseCaseFactory";
import {TUseCaseName} from "../../accounting/account/TUseCaseName";

export class UseCase{

    constructor(
        protected _UseCaseFactory: typeof UseCaseFactory,
        protected _presenter: UseCasePresenter,
        protected _domain_name?: string,
        protected _use_case_name?: TUseCaseName
    ) {}

    execute(...data: any[]) {
        if (this._presenter) this._presenter.execute(this._use_case_name, ...data);
    }

    forward(use_case_name: TUseCaseName,...data: any[]) {
        this._UseCaseFactory.create(use_case_name).execute(...data);
    }


    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }

}
