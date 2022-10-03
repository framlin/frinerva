const UseCaseInteractor = require("../../common/use_case/UseCaseInteractor");
// const Accounting = require('../account/Accounting');
import {Accounting} from '../account/Accounting';

class ShowListInteractor extends UseCaseInteractor{
    async execute() {
        let accounting: Accounting = new Accounting(this._helper);
        let account_list = await accounting.get_account_names();
        this._presenter.show(account_list);
    }
}

module.exports = ShowListInteractor;
export {ShowListInteractor}