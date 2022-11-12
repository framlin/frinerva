import {UseCaseInteractor} from "../../../common/usecase/UseCaseInteractor";
import {Accounting} from '../../entites/Accounting';

export class ShowListInteractor extends UseCaseInteractor{
    async execute() {
        console.log("ACCOUNTING ShowListInteractor.execute", this._domain_entity);
        const account_list = await (this._domain_entity as Accounting).get_account_names();
        if (this._response_boundary) this._response_boundary.show(account_list);
    }
}
