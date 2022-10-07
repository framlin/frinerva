import {ipcRenderer} from "electron";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {BookingEntry} from "../../../account/BookingEntry";
import {TableRenderer} from "../../../../common/ui/renderer/TableRenderer";
import {AccountData} from "../../../account/Account";

let dispatch_booking_entry_view: DispatchBookingEntriesView;

class DispatchBookingEntriesView extends UseCaseView {

    constructor(use_case_name: string) {
        super('accounting', use_case_name)
        dispatch_booking_entry_view = this;
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    register_event_listener() {
        console.log("NEXT_BUTTON not implemented yet")
    }

    show_virtual_accounts(virtual_accounts:AccountData[]) {
        let virtual_account_list_elem = document.getElementById("virtual-account-list") as HTMLDivElement;
        if (virtual_account_list_elem) {
            while (virtual_account_list_elem.firstChild) {
                try {
                    virtual_account_list_elem.removeChild(virtual_account_list_elem.firstChild);
                } catch (e) {
                }
            }
        }

        for (let virtual_account of virtual_accounts) {
            this.show_virtual_account(virtual_account, virtual_accounts);
        }
    }

    show_virtual_account(virtual_account: AccountData, virtual_accounts: AccountData[]){

        let virtual_account_list_elem = document.getElementById("virtual-account-list") as HTMLDivElement;
        let property_mapping = BookingEntry.property_mapping.filter((prop) => prop !== 'id');
        let account_div = TableRenderer.create_editable_table(
            `${virtual_account.booking_period} - ${virtual_account.cost_center}`,
            virtual_account.booking_entries,
            property_mapping,
            () => {
                this.show_virtual_accounts(virtual_accounts);
            });
        this.add_submit_button(account_div, virtual_account);
        if (virtual_account_list_elem) {
            virtual_account_list_elem.appendChild(account_div);
        }
    }

    add_submit_button(account_div: HTMLDivElement, virtual_account: AccountData) {
        let button_element = document.createElement('button');
        button_element.innerText = "Submit";
        account_div.appendChild(button_element);
        button_element.addEventListener('click', (e: MouseEvent) => {
            if (e.target) {
                ipcRenderer.send('create_account:submit', virtual_account);

                console.log(`ACCOUNT ${virtual_account.booking_period}/${virtual_account.cost_center} submitted`)
            }

        })
    }
}

ipcRenderer.on('dispatch_booking_entries:show_virtual_accounts', (e, virtual_accounts: AccountData[]) => {
    dispatch_booking_entry_view.show_virtual_accounts(virtual_accounts);
});

module.exports = {DispatchBookingEntriesView};
export {DispatchBookingEntriesView}