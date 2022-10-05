import {AccountData} from "../../account/Account";
import {WebContents} from 'electron';
import {DispatchBookingEntriesResponseBoundary} from "./DispatchBookingEntriesResponseBoundary";
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";

let presenter: DispatchBookingEntriesPresenter;

class DispatchBookingEntriesPresenter extends UseCasePresenter implements DispatchBookingEntriesResponseBoundary{

    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
        presenter = this;
    }

    show(_virtual_accounts: AccountData[]) {
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', _virtual_accounts);
    }
}
module.exports = {DispatchBookingEntriesPresenter};
export {DispatchBookingEntriesPresenter}