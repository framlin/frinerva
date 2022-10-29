import {WebContents} from 'electron';
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../account/Account";
import {DispatchBookingEntriesResponseBoundary} from "./DispatchBookingEntriesResponseBoundary";

let presenter: DispatchBookingEntriesPresenter;

export class DispatchBookingEntriesPresenter
    extends UseCasePresenter
    implements DispatchBookingEntriesResponseBoundary {

    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
        presenter = this;
    }

    show(_virtual_accounts: AccountData[]) {
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', _virtual_accounts);
    }
}