import {Observable} from "../../../common/observation/Observable";
import {Observatory} from "../../../common/observation/Observatory";
import {Observer} from "../../../common/observation/Observer";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {Account, ACCOUNT_ID} from "../../entites/Account";

export class ShowListController extends UseCaseController implements Observer<Account> {
    CLASS_ID: Account = ACCOUNT_ID;

    register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver('show_list:account_selected', (e, key: string) => {
            this.forward('show_account', key);
        });
    }

    signal(subject: Observable<Account>): void {
        this.request_boundary?.execute();
    }

    subscribe_at(observatory: Observatory) {
        //this is called from the base-class-constructor, so we have
        //to initialize CLASS_ID before we subscribe
        this.CLASS_ID = ACCOUNT_ID;

        observatory.subscribe(this);
    }
}

