import {BookingRecordData} from "../../../account/BookingRecord";
import {ipcRenderer} from "electron";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {CSVFileImportRenderer} from './CSVFileImportRenderer';
import {MoneyMoneyPayment} from "../../../account/Payment";


let read_cvs_file_view: ReadCSVFileView;

class ReadCSVFileView extends UseCaseView {

    public import_renderer = new CSVFileImportRenderer();
    constructor(use_case_name: string) {
        super('accounting', use_case_name);
        read_cvs_file_view = this;
    }

    register_event_listener() {
        this.register_next_button();
    };

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    register_next_button() {
        let next_button = document.querySelector('.next-btn') as HTMLButtonElement;
        if (next_button) {
            next_button.addEventListener('click', () => {
                let booking_entries = this.get_booking_records();
                ipcRenderer.send('read_csv_file:next', booking_entries);
            });
        }
    }

    get_booking_records() {
        let booking_records: BookingRecordData[] = [];
        let rows = document.querySelectorAll('#payment-entries > table tr') as NodeListOf<HTMLTableRowElement>;
        rows.forEach((row) => {
            // @ts-ignore
            booking_records.push(row.booking_record);
        })
        return booking_records;
    }

    show_payments(payments: MoneyMoneyPayment[]) {
        let payments_div = document.querySelector("#payment-entries") as HTMLDivElement;
        if (payments_div) {
            if (payments_div.firstChild) {
                this._clear_payment_entries(payments_div);
            } else {
                let table: HTMLTableElement = document.createElement("table");
                payments_div.appendChild(table);
                for (let payment of payments) {
                    let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
                    this._add_payments_row(table, values);
                }
            }
        }
    };

    _clear_payment_entries(payments_div: HTMLDivElement) {
        while (payments_div.firstChild) {
            try {
                payments_div.removeChild(payments_div.firstChild);
            } catch (e) {
            }
        }
    }

    _add_payments_row(table: HTMLTableElement, payments: string[]) {
        let row = table.insertRow(-1);
        payments.forEach((payment, i) => {
            let cell = row.insertCell(i);
            let text = document.createTextNode(payment);
            cell.appendChild(text);
        });
    }

}

ipcRenderer.on('read_csv_file:show_payments', (e, payments: MoneyMoneyPayment[]) => {
    read_cvs_file_view.show_payments(payments);
});

ipcRenderer.on('read_csv_file:show_booking_records', (e, _booking_records: BookingRecordData[]) => {
    read_cvs_file_view.import_renderer.show_booking_records(_booking_records);
});


module.exports = {ReadCSVFileView};
export {ReadCSVFileView}