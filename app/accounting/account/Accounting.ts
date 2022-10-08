import {Account, ACCOUNT_ID} from "./Account";
import {BookingEntry}  from"./BookingEntry";
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Subject} from "../../common/observation/Subject";
import {Observable} from "../../common/observation/Observable";
import { Observer } from "../../common/observation/Observer";
import {DomainHelper} from "../../common/domain/DomainHelper";
import {AccountingHelper} from "../../common/persistence/helper/AccountingHelper";


class Accounting extends DomainEntity implements Observable<Account> {


    constructor(domain_helper: typeof DomainHelper) {
        super(domain_helper);
        this._account_storage = this._domain_helper as typeof AccountingHelper;
    }

    add(observer: Observer<Account>): void {
       this._subject.add(observer)
    }
    set state(value: Account) {
        this._subject.state = value;
    }
    get state(): Account {
        return this._subject.state;
    }

    static create_booking_entry(date: Date, subject: string, name: string, amount: number, booking_code: string) : BookingEntry {
        return new BookingEntry(date, subject, name, amount, booking_code);
    }

    async create_account(booking_period: string, cost_center: string): Promise<Account | null> {
        let account: Account | null = null;
        if (!this._account_storage.account_exists(booking_period, cost_center)) {
            account = new Account(booking_period, cost_center);
            await this._account_storage.save_account(account);
            if (this._subject) this._subject.state = account;
        }
        return account;
    }

    async create_virtual_account(booking_period: string, cost_center: string) : Promise<Account|null>{
        let result;
        if (this._account_storage.account_exists(booking_period, cost_center)) {
            result = await this._account_storage.load_account(booking_period, cost_center);
        } else {
            result = new Account(booking_period, cost_center);
        }
        return result;
    }

    async get_account_names() {
        let account_storage_names =  await this._account_storage.get_account_name_list();
        let cost_center_configuration = await this._account_storage.load_cost_center_configuration();
        let cost_center_mapping = JSON.parse(cost_center_configuration);
        let result = [];
        for (let {booking_period, cost_center} of account_storage_names) {
            let account_name = cost_center_mapping[cost_center];
            result.push(`${booking_period} - ${account_name}`);
        }
        return result;
    }

    protected _subject: Observable<Account> = new Subject<Account>(ACCOUNT_ID);
    CLASS_ID: Account = ACCOUNT_ID;
    private _account_storage;
}

module.exports = {Accounting};

export {Accounting}