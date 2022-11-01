import {ipcRenderer} from "electron";
import {register_IPCRenderer_listener} from "../../../../common/ui/ipc/register_IPCRenderer_listener";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {BookingRecordData} from "../../../account/BookingRecord";
import {MoneyMoneyPayment} from "../../../account/Payment";
import {CSVFileImportRenderer} from './CSVFileImportRenderer';
import {TUseCaseName} from "../../../account/TUseCaseName";


export class ReadCSVFileView extends UseCaseView {

    public import_renderer = new CSVFileImportRenderer();
    constructor(use_case_name: TUseCaseName) {
        super(use_case_name, 'accounting');
    }

    register_event_listener() {
        this.register_next_button();
    };

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
        this.register_IPCRenderer_listener();
    }

    register_next_button() {
        const next_button = document.querySelector('.next-btn') as HTMLButtonElement;
        if (next_button) {
            next_button.addEventListener('click', () => {
                const booking_entries = this.get_booking_records();
                ipcRenderer.send('read_csv_file:next', booking_entries);
            });
        }
    }

    get_booking_records() {
        const booking_records: BookingRecordData[] = [];
        const rows = document.querySelectorAll('#payment-entries > table tr') as NodeListOf<HTMLTableRowElement>;
        rows.forEach((row) => {
            // @ts-ignore
            booking_records.push(row.booking_record as BookingRecordData);
        })
        return booking_records;
    }

    show_payments(payments: MoneyMoneyPayment[]) {
        const payments_div = document.querySelector("#payment-entries") as HTMLDivElement;
        if (payments_div) {
            if (payments_div.firstChild) {
                this._clear_payment_entries(payments_div);
            } else {
                const table: HTMLTableElement = document.createElement("table");
                payments_div.appendChild(table);
                for (const payment of payments) {
                    const values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
                    this._add_payments_row(table, values);
                }
            }
        }
    };

    private _clear_payment_entries(payments_div: HTMLDivElement) {
        while (payments_div.firstChild) {
            try {
                payments_div.removeChild(payments_div.firstChild);
            } catch (e) {
            }
        }
    }

    private _add_payments_row(table: HTMLTableElement, payments: string[]) {
        const row = table.insertRow(-1);
        payments.forEach((payment, i) => {
            const cell = row.insertCell(i);
            const text = document.createTextNode(payment);
            // noinspection TypeScriptValidateJSTypes
            cell.appendChild(text);
        });
    }

    private register_IPCRenderer_listener() {
        register_IPCRenderer_listener('read_csv_file:show_payments', (e, payments: MoneyMoneyPayment[]) => {
            this.show_payments(payments);
        });
        register_IPCRenderer_listener('read_csv_file:show_booking_records', (e, _booking_records: BookingRecordData[]) => {
            this.import_renderer.show_booking_records(_booking_records);
        })
    }
}
