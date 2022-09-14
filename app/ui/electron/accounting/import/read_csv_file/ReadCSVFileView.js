const {ipcRenderer} = require("electron");
const UseCaseView = require("../../../use_case/UseCaseView");
const path = require("path");

class ReadCSVFileView extends UseCaseView {

    constructor(use_case_name) {
        super(use_case_name)
        this.receive_ipc_message('read_csv_file:show_payments', ReadCSVFileView.show_payments);
    }

    async create_view() {
        await this.insert_markup_at(__dirname, '#account-panel');
    }

    static show_payments(e, payments) {
        debugger
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

// ipcRenderer.on('read_csv_file:show_payments', (e, payments) => {

// })
module.exports = ReadCSVFileView;