import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../entites/Account";
import {TShowAccountViewChannelName} from "./ui/TShowAccountViewChannelName";


export class ShowAccountPresenter extends UseCasePresenter {

    show(account: AccountData) {
        const channel:TShowAccountViewChannelName = 'show_account:show_account';
        this._ipc_channel.send(channel, account, false);
    }
}