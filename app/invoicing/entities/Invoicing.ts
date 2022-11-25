import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observable} from "../../common/observation/Observable";
import {Observatory} from "../../common/observation/Observatory";
import {Observer} from "../../common/observation/Observer";
import {Invoice, INVOICE_ID} from "./Invoice";

export class Invoicing  extends DomainEntity implements Observable<Invoice> {
    CLASS_ID: Invoice = INVOICE_ID;

    add(observer: Observer<Invoice>): void {
    }

    provide_at(observatory: Observatory): void {
    }

    set state(value: Invoice) {
    }
}