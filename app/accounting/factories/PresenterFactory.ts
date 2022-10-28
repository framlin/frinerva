import WebContents = Electron.WebContents;

import {Presenter}  from './presenter';
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
class PresenterFactory{
    static create(use_case_name: string, ipc_channel: WebContents) : UseCasePresenter{
        return new Presenter[use_case_name](ipc_channel);
    }
}

module.exports = {PresenterFactory};
export {PresenterFactory}


