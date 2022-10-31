import WebContents = Electron.WebContents;
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {UseCasePresenterConstructor} from "../../common/use_case/UseCasePresenterConstructor";


export class PresenterFactory {
    static create(ctor: UseCasePresenterConstructor, ipc_channel: WebContents): UseCasePresenter {
        return new ctor(ipc_channel);
    }
}



