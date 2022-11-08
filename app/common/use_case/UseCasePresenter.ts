import {WebContents} from 'electron';
import {create_response_channel, ResponseChannel} from "../ipc/ResponseChannel";
import {TUseCaseName} from "./TUseCaseName";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

export abstract class UseCasePresenter implements UseCaseResponseBoundary{

    constructor(protected _ipc_channel: WebContents) {
        this._response_channel = create_response_channel(_ipc_channel);
    }

    abstract show(...data: unknown[]): void;

    execute(use_case_name: TUseCaseName|undefined, ...data: any[]) {
        this._response_channel.send('use_case:created', use_case_name, ...data);
    }

    protected _response_channel: ResponseChannel;

}
