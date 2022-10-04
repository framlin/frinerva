"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFileView = void 0;
const { ipcRenderer, contextBridge } = require("electron");
const { UseCaseView } = require("../../../../common/ui/use_case/UseCaseView");
const { BookingEntry } = require("../../../account/BookingEntry");
const CSVFileImportRenderer_1 = require("./CSVFileImportRenderer");
const path = require("path");
let read_cvs_file_view;
class ReadCSVFileView extends UseCaseView {
    constructor(use_case_name) {
        super('accounting', use_case_name);
        this.import_renderer = new CSVFileImportRenderer_1.CSVFileImportRenderer();
        read_cvs_file_view = this;
    }
    register_event_listener() {
        this.register_next_button();
    }
    ;
    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }
    register_next_button() {
        let next_button = document.querySelector('.next-btn');
        if (next_button) {
            next_button.addEventListener('click', () => {
                let booking_entries = this.get_booking_records();
                ipcRenderer.send('read_csv_file:next', booking_entries);
            });
        }
    }
    get_booking_records() {
        let booking_records = [];
        let rows = document.querySelectorAll('#payment-entries > table tr');
        rows.forEach((row) => {
            // @ts-ignore
            booking_records.push(row.booking_record);
        });
        return booking_records;
    }
    show_payments(payments) {
        let payments_div = document.querySelector("#payment-entries");
        if (payments_div) {
            if (payments_div.firstChild) {
                this._clear_payment_entries(payments_div);
            }
            else {
                let table = document.createElement("table");
                payments_div.appendChild(table);
                for (let payment of payments) {
                    let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag];
                    this._add_payments_row(table, values);
                }
            }
        }
    }
    ;
    _clear_payment_entries(payments_div) {
        while (payments_div.firstChild) {
            try {
                payments_div.removeChild(payments_div.firstChild);
            }
            catch (e) {
            }
        }
    }
    _add_payments_row(table, payments) {
        let row = table.insertRow(-1);
        payments.forEach((payment, i) => {
            let cell = row.insertCell(i);
            let text = document.createTextNode(payment);
            cell.appendChild(text);
        });
    }
}
exports.ReadCSVFileView = ReadCSVFileView;
ipcRenderer.on('read_csv_file:show_payments', (e, payments) => {
    read_cvs_file_view.show_payments(payments);
});
ipcRenderer.on('read_csv_file:show_booking_records', (e, _booking_records) => {
    read_cvs_file_view.import_renderer.show_booking_records(_booking_records);
});
module.exports = { ReadCSVFileView };
//# sourceMappingURL=ReadCSVFileView.js.map