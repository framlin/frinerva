import WebContents = Electron.WebContents;
import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

export class PresenterFactory{
    static create(blueprint: Blueprint, ipc_channel: WebContents) : UseCasePresenter{
        return new blueprint.presenter(ipc_channel);
    }
}



