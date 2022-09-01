const Account = require("../../account/Account");
const Balancing = require("../../balancing/Balancing");
const BookingEntry = require("../../account/BookingEntry");

class BookingEntryDispatchInteractor {
    constructor(presenter){
        this._presenter = presenter;
        this._balancing = new Balancing();
        this._virtual_accounts = null;
    }

    get virtual_accounts() {
        return this._virtual_accounts;
    }

    _extract_cost_center(booking_records) {
        let cost_center_sets = {}

        for(let {cost_center, year} of booking_records) {
            if (!cost_center_sets[year]) {
                cost_center_sets[year] = new Set();
            }
            cost_center_sets[year].add(cost_center);
        }

        return cost_center_sets;
    }

    async execute_use_case(booking_records) {
        let cost_center_set = this._extract_cost_center(booking_records);
        this._presenter.show_cost_center_list(cost_center_set, BookingEntry.property_mapping);
        this._virtual_accounts = this._merge(booking_records, cost_center_set);
    }

    _get_accounts(cost_center_set) {
        let existing_accounts = {};
        for (let booking_period in cost_center_set) {
            existing_accounts[booking_period] = {};
            for (let cost_center of cost_center_set[booking_period]) {
                existing_accounts[booking_period][cost_center] = [];
                let accounts = this._balancing.get_accounts(cost_center, booking_period);
                if (accounts.length > 0) {
                    for (let account of accounts) {
                        existing_accounts[booking_period][cost_center].push(account);
                    }
                }
            }
        }
        return existing_accounts;
    }

    _merge(booking_records, cost_center_set) {
        let existing_accounts = this._get_accounts(cost_center_set);
        let virtual_accounts = this._create_virtual_accounts(booking_records);

        for (let booking_period in existing_accounts) {
            for (let cost_center in existing_accounts[booking_period]) {
                for (let existing_account of existing_accounts[booking_period][cost_center]){
                    virtual_accounts[booking_period][cost_center].push(existing_account);
                }
            }
        }

        return virtual_accounts;
    }

    _create_virtual_accounts(booking_records) {
        let account_map = {};
        for (let {booking_entry, cost_center, year} of booking_records) {
            booking_entry = BookingEntry.create_from_JSON(JSON.stringify(booking_entry));
            if (!account_map[year]) {
                let account = this._create_virtual_account(cost_center, year, booking_entry);
                account_map[year]= {};
                account_map[year][cost_center] = [account];
                continue;
            }
            if(!account_map[year][cost_center]) {
                let account = this._create_virtual_account(cost_center, year, booking_entry);
                account_map[year][cost_center] = [account];
                continue;
            }
            account_map[year][cost_center][0].add(booking_entry);
        }

        return account_map;
    }

    _create_virtual_account(cost_center, year, booking_entry) {
        let account = new Account(`${cost_center.toLowerCase()}-${year}`, cost_center);
        account.add(booking_entry);
        return account;
    }
}

module.exports = BookingEntryDispatchInteractor;