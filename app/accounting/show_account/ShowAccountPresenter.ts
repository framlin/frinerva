import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {AccountData} from "../account/Account";
import {ShowAccountResponseBoundary} from "./ShowAccountResponseBoundary";

let presenter: ShowAccountPresenter;

export class ShowAccountPresenter extends UseCasePresenter implements ShowAccountResponseBoundary {
    constructor(ipc_chanel: any) {
        super(ipc_chanel);
        presenter = this;
    }

    show(account: AccountData) {
        this._ipc_channel.send('show_account:show_account', account);
    }
}