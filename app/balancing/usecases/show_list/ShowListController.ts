import {Observable} from "../../../common/observation/Observable";
import {Observer} from "../../../common/observation/Observer";
import {UseCaseController} from "../../../common/usecase/UseCaseController";
import {Balance, BALANCE_ID} from "../../entities/Balance";

export class ShowListController extends UseCaseController implements Observer<Balance> {
    CLASS_ID: Balance = BALANCE_ID;

    signal(subject: Observable<Balance>): void {
    }
}