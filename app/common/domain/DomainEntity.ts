import {Observable} from "../observation/Observable";
import {DomainHelper} from "./DomainHelper";

abstract class DomainEntity {
    protected constructor(domain_helper: typeof DomainHelper) {
        this._domain_helper = domain_helper;
    };
    protected _subject: Observable<any> | null = null;
    protected  _domain_helper: typeof DomainHelper;
}
export {DomainEntity}