import {WebContents} from 'electron';
import {TUseCaseName} from "./TUseCaseName";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

export abstract class UseCasePresenter implements UseCaseResponseBoundary{

    constructor(protected _ipc_channel: WebContents) {}

    abstract show(...data: unknown[]): void;

    execute(use_case_name: TUseCaseName|undefined, ...data: any[]) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }
}
