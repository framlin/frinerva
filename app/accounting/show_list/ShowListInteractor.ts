import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {Accounting} from '../account/Accounting';

export class ShowListInteractor extends UseCaseInteractor{
    async execute() {
        const account_list = await (this._domain_entity as Accounting).get_account_names();
        if (this._response_boundary) this._response_boundary.show(account_list);
    }
}
