import {WebContents} from 'electron';
import {create_response_channel, ResponseChannel} from "../ipc/ResponseChannel";
import {UseCaseResponseBoundary} from "./UseCaseResponseBoundary";

export abstract class UseCasePresenter implements UseCaseResponseBoundary{

    constructor(protected _ipc_channel: WebContents) {
        this._response_channel = create_response_channel(_ipc_channel);
    }

    abstract show(...data: unknown[]): void;

    protected _response_channel: ResponseChannel;

}
