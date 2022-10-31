import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

export class ShowListPresenter extends UseCasePresenter {

    show(account_name_list: string[]) {
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}
