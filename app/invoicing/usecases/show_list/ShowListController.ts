import {Observable} from "../../../common/observation/Observable";
import {Observer} from "../../../common/observation/Observer";
import {UseCaseController} from "../../../common/usecase/UseCaseController";
import {Invoice, INVOICE_ID} from "../../entities/Invoice";

export class ShowListController extends UseCaseController implements Observer<Invoice> {
    CLASS_ID: Invoice = INVOICE_ID;

    signal(subject: Observable<Invoice>): void {
    }
}