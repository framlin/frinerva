import {UseCaseView} from "../../../common/ui/use_case/UseCaseView";
import {AccountData} from "../../account/Account";
import {ipcRenderer} from "electron";
import {BookingEntry} from "../../account/BookingEntry";
import {TableRenderer} from "../../../common/ui/renderer/TableRenderer";
import {register_IPCRenderer_listener} from "../../../common/ui/ipc/register_IPCRenderer_listener";


let show_account_view: ShowAccountView;

export class ShowAccountView extends UseCaseView {

    constructor(use_case_name: string) {
        super(use_case_name, 'accounting');
        show_account_view = this;
    }

    show_account(account: AccountData, editable: boolean = true): void {
        console.log('ShowAccountView.show_account', account);
        this._current_account = account;
        let account_panel = document.querySelector('#account-panel') as HTMLDivElement;
        account_panel.innerHTML = '';
        let property_mapping = BookingEntry.property_mapping.filter((prop) => prop !== 'id');
        let account_div = TableRenderer.create_table(
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
        this.register_IPCRenderer_listener();
    }

    register_event_listener(): void {
        let edit_button = document.querySelector('.edit-btn') as HTMLButtonElement;
        edit_button.addEventListener('click', () => {
            if (this._current_account) this.show_account(this._current_account, true);
            let submit_button = document.querySelector('.submit-btn') as HTMLButtonElement;
            submit_button.removeAttribute('disabled');
        })

        let submit_button = document.querySelector('.submit-btn') as HTMLButtonElement;
        submit_button.addEventListener('click', () => {
            if (this._current_account) {
                ipcRenderer.send('show_account:submit_account', this._current_account);
                submit_button.setAttribute('disabled', 'true');
            }
        });
    }

    private _current_account: AccountData | undefined;

    private register_IPCRenderer_listener() {
        register_IPCRenderer_listener('show_account:show_account',
            (e, account: AccountData, editable) => {
                this.show_account(account, editable);
            })
    }
}

// ipcRenderer.on('show_account:show_account', (e, account: AccountData, editable) => {
//     show_account_view.show_account(account, editable);
// })
