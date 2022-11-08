import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {UseCaseName} from "../../../../common/use_case/UseCaseName";
import {AccountHandle} from "../../../entites/AccountHandle";
import {AccountDescriptionLabel} from "../AccountDescriptionLabel";
import {CreateAccountRequestChannelName} from "../CreateAccountRequestChannelName";
import {CreateAccountResponseChannelName} from "../CreateAccountResponseChannelName";


export class CreateAccountView extends UseCaseView {

    constructor(use_case_name: UseCaseName) {
        super(use_case_name, 'accounting');
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
        this.register_response_channel_receiver();
    };

    register_event_listener() {
        this.register_create_button();
        this.register_account_list_entry_selection();
        this.register_move_button();
    }

    register_create_button() {
        const create_button = document.querySelector('.next-btn') as HTMLButtonElement;
        create_button.addEventListener('click', () => {
            let new_accounts_list = this.get_new_accounts_list();
            this._request_channel.send<CreateAccountRequestChannelName>('create_account:create', new_accounts_list)
        });
    }

    get_new_accounts_list() {
        let new_accounts_list: AccountHandle[] = [];
        let result_column_entries = document.querySelectorAll('#result-column .account-entry') as NodeListOf<HTMLElement>;
        result_column_entries.forEach((entry) => {
            new_accounts_list.push({
                booking_period: entry.dataset.bookingPeriod!,
                cost_center: entry.dataset.costCenter!,
            });
        });
        return new_accounts_list;
    }

    register_move_button() {
        let move_entry_button = document.querySelector('#move-entry-btn') as HTMLButtonElement;
        move_entry_button.addEventListener('click', () => {
            let accounts: { key: string | undefined, label: string }[] = [];
            let periods: string[] = [];

            let account_selection = document.querySelectorAll('#account-column .selected') as NodeListOf<HTMLElement>;
            account_selection.forEach((list_entry) => {
                accounts.push({key: list_entry.dataset.costCenter, label: list_entry.innerHTML});
            })
            let period_selection = document.querySelectorAll('#period-column .selected');
            period_selection.forEach((list_entry) => {
                periods.push(list_entry.innerHTML);
            })
            this._request_channel.send<CreateAccountRequestChannelName>
            ('create_account:period_cost_center_selection', {periods, accounts});
        });
    }

    register_account_list_entry_selection() {
        let list_entries = document.querySelectorAll('.selectable') as NodeListOf<HTMLDivElement>;
        list_entries.forEach((list_entry) => {
            this.add_selection_listener(list_entry);
        });
    }


    show_cost_center_list(cost_center_list: string[]) {
        this.clear_list('#account-column')
        let account_list = document.querySelector('#account-column') as HTMLDivElement;
        for (let cost_center in cost_center_list) {
            if (cost_center !== 'NONE') {
                let account_entry = document.createElement('div');
                account_entry.setAttribute('data-cost-center', cost_center);
                account_entry.classList.add("account-entry", "clickable", "selectable");
                account_entry.innerHTML = cost_center_list[cost_center];
                this.add_selection_listener(account_entry)
                account_list.appendChild(account_entry);
            }
        }
    };

    add_selection_listener(list_entry: HTMLDivElement) {
        list_entry.addEventListener('click', () => {
            list_entry.classList.toggle('selected');
        });
    }

    show_booking_period_list(booking_period_list: string[]) {
        this.clear_list('#period-column');
        let period_column = document.querySelector('#period-column') as HTMLDivElement;
        for (let booking_period of booking_period_list) {
            let account_entry = document.createElement('div');
            account_entry.setAttribute('data-booking-period', booking_period);
            account_entry.classList.add("account-entry", "clickable", "selectable");
            account_entry.innerHTML = booking_period
            this.add_selection_listener(account_entry)
            period_column.appendChild(account_entry);
        }
    }

    show_new_accounts_list(new_accounts_list: AccountDescriptionLabel[]) {
        let result_column = document.querySelector('#result-column') as HTMLDivElement;
        for (let new_account of new_accounts_list) {
            let new_entry = document.createElement('div');
            new_entry.innerHTML = `${new_account.booking_period} -${new_account.label}`
            new_entry.setAttribute('data-cost-center', new_account.cost_center);
            new_entry.setAttribute('data-booking-period', new_account.booking_period);
            new_entry.classList.add("account-entry", "clickable", "selectable");
            this.add_selection_listener(new_entry)
            result_column.appendChild(new_entry);
        }
    }

    show_error(error_message: string) {
        alert(error_message);
    }

    account_creation_done() {
        this.reset_list('#account-column');
        this.reset_list('#period-column');
        this.clear_list('#result-column');
    }

    clear_list(selector: string) {
        let list = document.querySelector(selector) as HTMLDivElement;
        // @ts-ignore
        for (let child of list.children) {
            if (!child.classList.contains('account-list-header')) {
                child.remove();
            }
        }
    }

    reset_list(selector: string) {
        let list = document.querySelector(selector) as HTMLDivElement;
        // @ts-ignore
        for (let child of list.children) {
            child.classList.remove('selected');
        }
    }

    private register_response_channel_receiver() {
        this._response_channel.register_receiver<CreateAccountResponseChannelName>(
            'create_account:show_cost_center_list', (e, cost_center_list: string[]) => {
                this.show_cost_center_list(cost_center_list);
            });

        this._response_channel.register_receiver<CreateAccountResponseChannelName>
        ('create_account:show_booking_period_list', (e, booking_period_list: string[]) => {
            this.show_booking_period_list(booking_period_list);
        })

        this._response_channel.register_receiver<CreateAccountResponseChannelName>
        ('create_account:show_new_accounts_list', (e, new_accounts_list: AccountDescriptionLabel[]) => {
            this.show_new_accounts_list(new_accounts_list);
        });

        this._response_channel.register_receiver<CreateAccountResponseChannelName>
        ('create_account:show_error', (e, error_message: string) => {
            this.show_error(error_message);
        });

        this._response_channel.register_receiver<CreateAccountResponseChannelName>
        ('create_account:account_creation_done', () => {
            this.account_creation_done();
        })
    }
}
