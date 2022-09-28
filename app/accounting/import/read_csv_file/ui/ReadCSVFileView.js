const {ipcRenderer, contextBridge} = require("electron");
const UseCaseView = require("../../../../common/ui/use_case/UseCaseView");
const BookingEntry = require("../../../account/BookingEntry");

const path = require("path");
let read_cvs_file_view;

class ReadCSVFileView extends UseCaseView {

    constructor(use_case_name) {
        super('accounting', use_case_name);
        read_cvs_file_view = this;
    }


    register_event_listener() {
        this.on_register_callback();
    };

    async create_view() {
        await this.add_script(path.join(__dirname, 'read_csv_file.js'));
        await this.add_script(path.join(__dirname, 'CSVFileImportRenderer.js'));
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    on_register_callback;
}

contextBridge.exposeInMainWorld('accounting__read_csv_file', {
    show_payments: (callback) => {show_payments = callback},
    show_booking_records: (callback) => {show_booking_records = callback},
    get_property_mapping : () => BookingEntry.property_mapping,
    register_event_listener: (callback) => {read_cvs_file_view.on_register_callback = callback},
    send_next: (booking_entries) => ipcRenderer.send('read_csv_file:next', booking_entries),
});

let show_payments;
ipcRenderer.on('read_csv_file:show_payments', (e, payments) => {
    show_payments(payments);
});

let show_booking_records;
let booking_records;
ipcRenderer.on('read_csv_file:show_booking_records', (e, _booking_records) => {
    booking_records = _booking_records
    show_booking_records(_booking_records);
});


module.exports = ReadCSVFileView;