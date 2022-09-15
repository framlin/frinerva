const {ipcRenderer} = require("electron");
const UseCaseView = require("../../../use_case/UseCaseView");
const CSVFileImportRenderer = require("../../renderer/CSVFileImportRenderer");

const path = require("path");

class ReadCSVFileView extends UseCaseView {

    static _csv_file_import_renderer = new CSVFileImportRenderer();

    constructor(use_case_name) {
        super(use_case_name)
    }

    register_next_button() {
        let next_button = document.querySelector('.next-btn');
        next_button.addEventListener('click', () => {
            console.log("READ-CSV-FILE:NEXT")
            ipcRenderer.send('read_csv_file:next')
        });
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '.workbench');
        this.register_next_button();
    }

    static show_booking_records(booking_records) {
        ReadCSVFileView._csv_file_import_renderer.show_booking_entries(booking_records);
    }

    static show_payments(payments) {
        let payments_div = document.querySelector("#payment-entries");
        if (payments_div.firstChild) {
            ReadCSVFileView._clear_payment_entries(payments_div);
        } else {
            let table = document.createElement("table");
            payments_div.appendChild(table);
            for (let payment of payments) {
                let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
                ReadCSVFileView._add_payments_row(table, values);
            }

        }
    }

    static _clear_payment_entries(payments_div) {
        while (payments_div.firstChild) {
            try {
                payments_div.removeChild(payments_div.firstChild);
            } catch (e) {
            }
        }
    }

    static _add_payments_row(table, payments) {
        let row = table.insertRow(-1);
        payments.forEach((payment, i) => {
            let cell = row.insertCell(i);
            let text = document.createTextNode(payment);
            cell.appendChild(text);
        });
    }

}

ipcRenderer.on('read_csv_file:show_payments', (e, payments) => {
    ReadCSVFileView.show_payments(payments);
});

ipcRenderer.on('read_csv_file:show_booking_records', (e, booking_records) => {
    ReadCSVFileView.show_booking_records(booking_records);
});
module.exports = ReadCSVFileView;