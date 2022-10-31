import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountData} from "../../account/Account";

export class DispatchBookingEntriesPresenter
    extends UseCasePresenter{

    show(_virtual_accounts: AccountData[]) {
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', _virtual_accounts);
    }
}