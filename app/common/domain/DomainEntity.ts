import {Observable} from "../observation/Observable";
import {DomainHelper} from "./DomainHelper";
import {Providing} from "../observation/Providing";
import {Observatory} from "../observation/Observatory";

export abstract class DomainEntity implements Providing {
    constructor(domain_helper: typeof DomainHelper) {
        this._domain_helper = domain_helper;
    };
    protected _subject: Observable<any> | null = null;
    protected  _domain_helper: typeof DomainHelper;

    abstract provide_at(observatory: Observatory): void;
}