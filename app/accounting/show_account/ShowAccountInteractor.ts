import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {Accounting} from "../account/Accounting";
import {Account, AccountData} from "../account/Account";

export class ShowAccountInteractor extends UseCaseInteractor {

    async execute(key: string): Promise<Account | null> {
        let account = await (this._domain_entity as Accounting).load_account(key);
        if (account) this.response_boundary.show(account.data);
        return account;
    }

    async submit(account_data: AccountData) {
        let account = await (this._domain_entity as Accounting).create_account_from(account_data);
        if (account) this.response_boundary.show(account.data);
    }
}