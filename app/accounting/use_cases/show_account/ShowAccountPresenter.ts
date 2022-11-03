import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../entites/Account";


export class ShowAccountPresenter extends UseCasePresenter {

    show(account: AccountData) {
        this._ipc_channel.send('show_account:show_account', account, false);
    }
}