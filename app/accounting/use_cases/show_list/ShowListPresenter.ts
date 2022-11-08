import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {TShowListViewChannelName} from "./ui/TShowListViewChannelName";

export class ShowListPresenter extends UseCasePresenter {

    show(account_name_list: string[]) {
        const channel: TShowListViewChannelName = 'show_list:show';
        this._response_channel.send(channel, account_name_list);
    }
}
