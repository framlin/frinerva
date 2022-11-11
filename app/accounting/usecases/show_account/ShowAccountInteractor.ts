import {UseCaseInteractor} from "../../../common/usecase/UseCaseInteractor";
import {Account, AccountData} from "../../entites/Account";
import {Accounting} from "../../entites/Accounting";
import {ShowAccountRequestBoundary} from "./ShowAccountRequestBoundary";

export class ShowAccountInteractor extends UseCaseInteractor implements ShowAccountRequestBoundary{

    async execute(key: string): Promise<Account | null> {
        const account = await (this._domain_entity as Accounting).load_account(key);
        if (account) this.response_boundary.show(account.data);
        return account;
    }

    async submit(account_data: AccountData) {
        const account = await (this._domain_entity as Accounting).create_account_from(account_data);
        if (account) this.response_boundary.show(account.data);
    }
}