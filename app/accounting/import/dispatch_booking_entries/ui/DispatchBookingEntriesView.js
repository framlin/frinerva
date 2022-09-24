const {ipcRenderer, contextBridge} = require("electron");
const UseCaseView = require("../../../../common/ui/use_case/UseCaseView");

const path = require("path");

class DispatchBookingEntriesView extends UseCaseView {

    constructor(use_case_name) {
        super('accounting', use_case_name)
    }

    register_next_button() {
        let next_button = document.querySelector('.next-btn');
        next_button.addEventListener('click', () => {
            // ipcRenderer.send('read_csv_file:next')
        });
    }

    register_event_listener() {
        this.register_next_button();
    }

    async create_view() {
        await this.add_script(path.join(__dirname, 'dispatch_booking_entries.js'));
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }
}

contextBridge.exposeInMainWorld('accounting__dispatch_booking_entries', {
    // show_payments: (callback) => ipcRenderer.on('read_csv_file:show_payments', callback),
    // show_booking_records: (callback) => ipcRenderer.on('read_csv_file:show_booking_records', callback),
    // get_property_mapping : () => BookingEntry.property_mapping,
});
module.exports = DispatchBookingEntriesView;