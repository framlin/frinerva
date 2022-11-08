import {UseCaseController} from "../../../../common/use_case/UseCaseController";
import {AccountData} from "../../../entites/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {DispatchBookingEntriesRequestBoundary} from "./DispatchBookingEntriesRequestBoundary";
import {DispatchBookingEntriesRequestChannelName} from "./DispatchBookingEntriesRequestChannelName";

export class DispatchBookingEntriesController extends UseCaseController {
    register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver<DispatchBookingEntriesRequestChannelName>
        ('create_account:submit', (e, virtual_account: AccountData) => {
            this.on_submit(virtual_account);
        });
    }

    on_submit(virtual_account: AccountData) {
        (this._request_boundary as DispatchBookingEntriesRequestBoundary).submit(virtual_account);
    }

}

