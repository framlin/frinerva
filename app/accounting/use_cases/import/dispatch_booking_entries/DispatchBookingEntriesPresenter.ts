import {UseCasePresenter} from "../../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../../entites/Account";
import {TDispatchBookingEntriesViewChannelName} from "./ui/TDispatchBookingEntriesViewChannelName";

export class DispatchBookingEntriesPresenter
    extends UseCasePresenter{

    show(_virtual_accounts: AccountData[]) {
        const channel:TDispatchBookingEntriesViewChannelName = 'dispatch_booking_entries:show_virtual_accounts';
        this._ipc_channel.send(channel, _virtual_accounts);
    }
}