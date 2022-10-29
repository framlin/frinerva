import WebContents = Electron.WebContents;
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

export class PresenterFactory{
    static create(ctor: typeof UseCasePresenter, ipc_channel: WebContents) : UseCasePresenter{
        return new ctor(ipc_channel);
    }
}



