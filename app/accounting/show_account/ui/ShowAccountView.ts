import {UseCaseView} from "../../../common/ui/use_case/UseCaseView";
import {AccountData} from "../../account/Account";
import {ipcRenderer} from "electron";
import {BookingEntry} from "../../account/BookingEntry";
import {TableRenderer} from "../../../common/ui/renderer/TableRenderer";


let show_account_view: ShowAccountView;

export class ShowAccountView extends UseCaseView {

    constructor(use_case_name: string) {
        super('accounting', use_case_name);
        show_account_view = this;
    }

    show_account(account: AccountData){
        console.log('ShowAccountView.show_account', account);
        let account_panel = document.querySelector('#account-panel') as HTMLDivElement;
        account_panel.innerHTML = '';
        let property_mapping = BookingEntry.property_mapping.filter((prop) => prop !== 'id');
        let account_div = TableRenderer.create_editable_table(
            `${account.booking_period} - ${account.cost_center}`,
            account.booking_entries,
            property_mapping,
            () => {
                this.show_account(account);
            });
        account_panel.appendChild(account_div);

    }

    async create_view(): Promise<void> {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    register_event_listener(): void {
        console.log('ShowAccountView.register_event_listener');
    }
}

ipcRenderer.on('show_account:show_account', (e, account: AccountData) => {
    show_account_view.show_account(account);
})
