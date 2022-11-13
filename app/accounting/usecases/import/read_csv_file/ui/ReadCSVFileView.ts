import {UseCaseView} from "../../../../../common/ui/usecase/UseCaseView";
import {UseCaseName} from "../../../../../common/usecase/UseCaseName";
import {BookingRecordData} from "../../../../entites/BookingRecord";
import {MoneyMoneyPayment} from "../../../../entites/Payment";
import {ReadCSVFileRequestChannelName} from "../ReadCSVFileRequestChannelName";
import {CSVFileImportRenderer} from './CSVFileImportRenderer';
import {ReadCSVFileResponseChannelName} from "../ReadCSVFileResponseChannelName";


export class ReadCSVFileView extends UseCaseView {

    public import_renderer = new CSVFileImportRenderer();

    constructor(use_case_name: UseCaseName) {
        super(use_case_name, 'accounting');
    }

    register_event_listener() {
        this.register_next_button();
    };

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
        this.register_response_channel_receiver();
    }

    register_next_button() {
        const next_button = document.querySelector('.next-btn') as HTMLButtonElement;
        if (next_button) {
            next_button.addEventListener('click', () => {
                const booking_entries = this.get_booking_records();
                this._request_channel.send<ReadCSVFileRequestChannelName>('read_csv_file:next', booking_entries);
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

    show_booking_records(booking_records: BookingRecordData[]) {
        this.import_renderer.show_booking_records(booking_records);
    }

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

    private register_response_channel_receiver() {
        this._response_channel.register_receiver<ReadCSVFileResponseChannelName>
        ('read_csv_file:show_payments', (e, payments: MoneyMoneyPayment[]) => {
            this.show_payments(payments);
        });
        this._response_channel.register_receiver<ReadCSVFileResponseChannelName>
        ('read_csv_file:show_booking_records', (e, _booking_records: BookingRecordData[]) => {
            this.show_booking_records(_booking_records);
        });
    }
}
