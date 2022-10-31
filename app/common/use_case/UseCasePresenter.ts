import {WebContents} from 'electron';
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

export abstract class UseCasePresenter implements UseCaseResponseBoundary{

    protected constructor(protected _ipc_channel: WebContents) {}

    abstract show(...data: unknown[]): void;

    execute(use_case_name: string|undefined, ...data: any[]) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }
}
