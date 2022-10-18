import {WebContents} from 'electron';
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

class UseCasePresenter implements UseCaseResponseBoundary{

    constructor(protected _ipc_channel: WebContents) {}

    show(...data: unknown[]){}

    execute(use_case_name: string, ...data: any[]) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }
}

module.exports = {UseCasePresenter};
export {UseCasePresenter}