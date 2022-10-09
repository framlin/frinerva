import {UseCaseInteractor}  from "../../common/use_case/UseCaseInteractor";
import {Accounting} from '../account/Accounting';

class ShowListInteractor extends UseCaseInteractor{
    async execute() {
        let account_list = await (this._domain_entity as Accounting).get_account_names();
        if (this._response_boundary) this._response_boundary.show(account_list);
    }
}

module.exports = {ShowListInteractor};
export {ShowListInteractor}