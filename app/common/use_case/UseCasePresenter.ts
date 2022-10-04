import {WebContents} from 'electron';
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

class UseCasePresenter implements UseCaseResponseBoundary{

    constructor(ipc_chanel: WebContents) {
        this._ipc_channel = ipc_chanel;
    }

    show(...data: unknown[]){}

    execute(use_case_name: string, ...data: any[]) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }

    _ipc_channel : WebContents;
}

module.exports = {UseCasePresenter};
export {UseCasePresenter}