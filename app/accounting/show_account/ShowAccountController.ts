import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Observer} from "../../common/observation/Observer";
import {Account, ACCOUNT_ID} from "../account/Account";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";

export class ShowAccountController extends UseCaseController implements Observer<Account>{
    CLASS_ID: Account = ACCOUNT_ID;

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
