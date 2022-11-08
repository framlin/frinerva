import {Observable} from "../../../common/observation/Observable";
import {Observatory} from "../../../common/observation/Observatory";
import {Observer} from "../../../common/observation/Observer";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {Account, ACCOUNT_ID, AccountData} from "../../entites/Account";
import {ShowAccountInteractor} from "./ShowAccountInteractor";

export class ShowAccountController extends UseCaseController implements Observer<Account> {
    CLASS_ID: Account = ACCOUNT_ID;

    protected register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver('show_account:submit_account', (e, account: AccountData) => {
            this.on_submit(account);
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

    on_submit(account: AccountData) {
        (this._request_boundary as ShowAccountInteractor).submit(account);
    }
}



