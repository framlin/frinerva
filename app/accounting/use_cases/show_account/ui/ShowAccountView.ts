import {TableRenderer} from "../../../../common/ui/renderer/TableRenderer";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {AccountData} from "../../../entites/Account";
import {BookingEntry} from "../../../entites/BookingEntry";
import {TShowAccountViewChannelName} from "./TShowAccountViewChannelName";


export class ShowAccountView extends UseCaseView {

    constructor(use_case_name: TUseCaseName) {
        super(use_case_name, 'accounting');
    }

    show_account(account: AccountData, editable: boolean = true): void {
        console.log('ShowAccountView.show_account', account);
        this._current_account = account;
        const account_panel = document.querySelector('#account-panel') as HTMLDivElement;
        account_panel.innerHTML = '';
        const property_mapping = BookingEntry.property_mapping.filter((prop) => prop !== 'id');
        const account_div = TableRenderer.create_table(
            `${account.booking_period} - ${account.cost_center}`,
            account.booking_entries,
            property_mapping,
            () => {
                this.show_account(account);
            },
            editable);
        account_panel.appendChild(account_div);
    }

    async create_view(): Promise<void> {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
        this.register_response_channel_receiver();
    }

    register_event_listener(): void {
        const edit_button = document.querySelector('.edit-btn') as HTMLButtonElement;
        edit_button.addEventListener('click', () => {
            if (this._current_account) this.show_account(this._current_account, true);
            const submit_button = document.querySelector('.submit-btn') as HTMLButtonElement;
            submit_button.removeAttribute('disabled');
        })

        const submit_button = document.querySelector('.submit-btn') as HTMLButtonElement;
        submit_button.addEventListener('click', () => {
            if (this._current_account) {
                this._request_channel.send('show_account:submit_account', this._current_account);
                submit_button.setAttribute('disabled', 'true');
            }
        });
    }

    private _current_account: AccountData | undefined;

    private register_response_channel_receiver() {
        this._response_channel.register_receiver<TShowAccountViewChannelName>('show_account:show_account',
            (e, account: AccountData, editable?:boolean) => {
                this.show_account(account, editable);
            })
    }
}
