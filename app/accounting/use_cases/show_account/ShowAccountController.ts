import {Observable} from "../../../common/observation/Observable";
import {Observatory} from "../../../common/observation/Observatory";
import {Observer} from "../../../common/observation/Observer";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {Account, ACCOUNT_ID, AccountData} from "../../entites/Account";
import {ShowAccountRequestBoundary} from "./ShowAccountRequestBoundary";
import {ShowAccountRequestChannelName} from "./ShowAccountRequestChannelName";


export class ShowAccountController extends UseCaseController implements Observer<Account> {
    CLASS_ID: Account = ACCOUNT_ID;

    protected register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver<ShowAccountRequestChannelName>('show_account:submit', (e, account: AccountData) => {
            (this._request_boundary as ShowAccountRequestBoundary).submit(account);
        });
     }

    signal(subject: Observable<Account>): void {
        //check if the subject is the current account and refresh the view
        // if (subject.state === this._current_account) {
        //     this._presenter.show(this._current_account);
        // }
    }

    subscribe_at(observatory: Observatory) {
        observatory.subscribe(this);
    }

}



