const {ipcRenderer, contextBridge} = require("electron");
const UseCaseView = require("../../../../common/ui/use_case/UseCaseView");
const BookingEntry = require("../../../account/BookingEntry");

const path = require("path");

class DispatchBookingEntriesView extends UseCaseView {

    constructor(use_case_name) {
        super('accounting', use_case_name)
    }

    register_event_listener() {
        on_register_event_listener();
    }

    async create_view() {
        await this.add_script(path.join(__dirname, '../../../../common/ui/renderer/TableRenderer.js'));
        await this.add_script(path.join(__dirname, 'dispatch_booking_entries.js'));
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }
}

let show_virtual_accounts;
let on_register_event_listener;
contextBridge.exposeInMainWorld('accounting__dispatch_booking_entries', {
    show_virtual_accounts: (callback) => {show_virtual_accounts = callback},
    register_event_listener: (callback) => {on_register_event_listener = callback},
    get_property_mapping: () => BookingEntry.property_mapping,
});

ipcRenderer.on('dispatch_booking_entries:show_virtual_accounts', (e, virtual_accounts) => {
    show_virtual_accounts(virtual_accounts);
});

module.exports = DispatchBookingEntriesView;