import WebContents = Electron.WebContents;
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {Blueprint} from "../../common/use_case/Blueprint";

class PresenterFactory{
    static create(blueprint: Blueprint, ipc_channel: WebContents) : UseCasePresenter{
        return new blueprint.presenter(ipc_channel);
    }
}

module.exports = {PresenterFactory};
export {PresenterFactory}


