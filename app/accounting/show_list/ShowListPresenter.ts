import {UseCasePresenter}  from "../../common/use_case/UseCasePresenter";
import {ShowListResponseBoundary} from "./ShowListResponseBoundary";

let presenter: ShowListPresenter;
class ShowListPresenter extends UseCasePresenter implements ShowListResponseBoundary{
    constructor(ipc_chanel: any) {
        super(ipc_chanel);
        presenter = this;
    }

    show(account_name_list: string[]) {
        this._ipc_channel.send('show_list:show_account_name_list', account_name_list);
    }
}

module.exports = {ShowListPresenter};
export {ShowListPresenter}