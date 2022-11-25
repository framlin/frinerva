import {WebContents} from "electron";
import {UseCaseFactory} from "../factories/UseCaseFactory";
import {create_response_channel, ResponseChannel} from "../ipc/ResponseChannel";
import {UseCaseName} from "./UseCaseName";

export class UseCase{

    constructor(
        protected _useCaseFactory: UseCaseFactory,
        protected _ipc_channel: WebContents,
        protected _use_case_name?: UseCaseName,
        protected _domain_name?: string
    ) {
        this._response_channel = create_response_channel(_ipc_channel);
    }

    execute(...data: any[]) {
        this._response_channel.send('use_case:created', this.use_case_name, ...data);
    }

    forward(use_case_name: UseCaseName, ...data: any[]) {
        this._useCaseFactory.create(use_case_name).execute(...data);
    }


    get use_case_name() {
        return this._use_case_name;
    }

    get domain_name() {
        return this._domain_name;
    }

    protected _response_channel: ResponseChannel;

}
