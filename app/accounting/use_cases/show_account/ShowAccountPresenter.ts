import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../entites/Account";
import {ShowAccountResponseChannelName} from "./ShowAccountResponseChannelName";

export class ShowAccountPresenter extends UseCasePresenter {
    show(account: AccountData) {
        const channel:ShowAccountResponseChannelName = 'show_account:show';
        this._response_channel.send(channel, account, false);
    }
}