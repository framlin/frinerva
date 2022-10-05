"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesView = void 0;
const electron_1 = require("electron");
const UseCaseView_1 = require("../../../../common/ui/use_case/UseCaseView");
const BookingEntry_1 = require("../../../account/BookingEntry");
const TableRenderer_1 = require("../../../../common/ui/renderer/TableRenderer");
let dispatch_booking_entry_view;
class DispatchBookingEntriesView extends UseCaseView_1.UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name);
        dispatch_booking_entry_view = this;
    }
    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }
    register_event_listener() {
        console.log("NEXT_BUTTON not implemented yet");
    }
    show_virtual_accounts(virtual_accounts) {
        let virtual_account_list_elem = document.getElementById("virtual-account-list");
        if (virtual_account_list_elem) {
            while (virtual_account_list_elem.firstChild) {
                try {
                    virtual_account_list_elem.removeChild(virtual_account_list_elem.firstChild);
                }
                catch (e) {
                }
            }
        }
        for (let virtual_account of virtual_accounts) {
            this.show_virtual_account(virtual_account, virtual_accounts);
        }
    }
    show_virtual_account(virtual_account, virtual_accounts) {
        let virtual_account_list_elem = document.getElementById("virtual-account-list");
        let property_mapping = BookingEntry_1.BookingEntry.property_mapping.filter((prop) => prop !== 'id');
        let account_div = TableRenderer_1.TableRenderer.create_editable_table(`${virtual_account.booking_period} - ${virtual_account.cost_center}`, virtual_account.booking_entries, property_mapping, () => {
            this.show_virtual_accounts(virtual_accounts);
        });
        // add_submit_button(account_div)
        if (virtual_account_list_elem) {
            virtual_account_list_elem.appendChild(account_div);
        }
    }
}
exports.DispatchBookingEntriesView = DispatchBookingEntriesView;
electron_1.ipcRenderer.on('dispatch_booking_entries:show_virtual_accounts', (e, virtual_accounts) => {
    dispatch_booking_entry_view.show_virtual_accounts(virtual_accounts);
});
module.exports = { DispatchBookingEntriesView };
//# sourceMappingURL=DispatchBookingEntriesView.js.map