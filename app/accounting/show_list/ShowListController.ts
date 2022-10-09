import {UseCaseController} from "../../common/use_case/UseCaseController";
import {Observer} from "../../common/observation/Observer";
import {Account, ACCOUNT_ID} from "../account/Account";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";

class ShowListController extends UseCaseController implements Observer<Account>{
    CLASS_ID: Account = ACCOUNT_ID;

    signal(subject: Observable<Account>): void {
        console.log("SHOW_LIST_CONTROLLER::SIGNAL")
        console.log(subject.state);
        this.request_boundary?.execute();
    }

    subscribe_at(observatory: Observatory) {
        console.log("SUBSCRBE AT")
        observatory.subscribe(this);
    }
}

module.exports = {ShowListController};
export {ShowListController}