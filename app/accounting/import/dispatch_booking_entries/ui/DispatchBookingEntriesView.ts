import {ipcRenderer, contextBridge} from "electron";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {BookingEntry} from "../../../account/BookingEntry";
import {TableRenderer} from "../../../../common/ui/renderer/TableRenderer";

let view: DispatchBookingEntriesView;

class DispatchBookingEntriesView extends UseCaseView {

    constructor(use_case_name: string) {
        super('accounting', use_case_name)
        view = this;
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    register_event_listener() {
        console.log("NEXT_BUTTON not implemented yet")
    }

    show_virtual_accounts(virtual_accounts:any[]) {
        let virtual_account_list_elem = document.getElementById("virtual-account-list");
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

    show_virtual_account(virtual_account: any, virtual_accounts: any[]){

        let virtual_account_list_elem = document.getElementById("virtual-account-list") as HTMLDivElement;
        let property_mapping = BookingEntry.property_mapping;
        let account_div = TableRenderer.create_editable_table(
            `${virtual_account.booking_period} - ${virtual_account.cost_center}`,
            virtual_account.booking_entries,
            property_mapping,
            () => {
                this.show_virtual_accounts(virtual_accounts);
            });
        // add_submit_button(account_div)
        if (virtual_account_list_elem) {
            virtual_account_list_elem.appendChild(account_div);
        }
    }
}

ipcRenderer.on('dispatch_booking_entries:show_virtual_accounts', (e, virtual_accounts) => {
    view.show_virtual_accounts(virtual_accounts);
});

module.exports = {DispatchBookingEntriesView};
export {DispatchBookingEntriesView}