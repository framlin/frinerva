import {UseCasePresenter} from "../../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../../entites/Account";
import {DispatchBookingEntriesResponseChannelName} from "./DispatchBookingEntriesResponseChannelName";

export class DispatchBookingEntriesPresenter
    extends UseCasePresenter{

    show(_virtual_accounts: AccountData[]) {
        const channel:DispatchBookingEntriesResponseChannelName = 'dispatch_booking_entries:show';
        this._response_channel.send(channel, _virtual_accounts);
    }
}