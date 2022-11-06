import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {TShowListViewChannelName} from "./ui/TShowListViewChannelName";

export class ShowListPresenter extends UseCasePresenter {

    show(account_name_list: string[]) {
        const channel: TShowListViewChannelName = 'show_list:show_account_name_list';
        this._ipc_channel.send(channel, account_name_list);
    }
}
