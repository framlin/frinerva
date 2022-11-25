import {create_request_channel} from "../ipc/RequestChannel";
import {Observatory} from "../observation/Observatory";
import {Subscribing} from "../observation/Subscribing";
import {UseCaseName} from "./UseCaseName";
import {UseCase} from "./UseCase";
import {UseCaseRequestBoundary} from "./UseCaseRequestBoundary";

export class UseCaseController implements Subscribing {
    constructor(
        protected _request_boundary: UseCaseRequestBoundary,
        protected _use_case: UseCase,
        observatory: Observatory
    ) {
        this._request_channel = create_request_channel()
        this.subscribe_at(observatory)
        this.register_request_channel_receiver();
    }

    protected register_request_channel_receiver() {
        this._request_channel.register_receiver('use_case:view_ready', (e, _domain_name, _use_case_name, ...data) => {
            this.on_use_case_view_ready(...data)
        });
    }

    execute(...data: any[]) {
        if (this._request_boundary) this._request_boundary.execute(...data)
    }

    forward(use_case_name: UseCaseName, ...data: any[]) {
        if (this._use_case) this._use_case.forward(use_case_name, ...data);
    }

    subscribe_at(observatory: Observatory): void {
        //intentionally left blank
    }

    get request_boundary() {
        return this._request_boundary;
    }

    on_use_case_view_ready(...data: any[]) {
        this.execute(...data);
    }

    protected _request_channel;
}
