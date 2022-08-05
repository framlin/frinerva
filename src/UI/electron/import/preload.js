const { ipcRenderer } = require('electron')

const ImportCSVBankingStatementsInteractor = require("../../../accounting/banking/csv_import/ImportCSVBankingStatementsInteractor");
const CSVFileImportPresenter = require("./CSVFileImportPresenter");
const CSVFileImportController = require("./CSVFileImportController");

const BookingEntryDispatchPresenter = require("./BookingEntryDispatchPresenter");
const BookingEntryDispatchInteractor = require("../../../accounting/banking/csv_import/BookingEntryDispatchInteractor");
const BockingEntryDispatchController = require("./BookingEntryDispatchController");

const csv_file_import_presenter = new CSVFileImportPresenter();
const import_csv_banking_statement_interactor =  new ImportCSVBankingStatementsInteractor(csv_file_import_presenter);
const import_controller = new CSVFileImportController(import_csv_banking_statement_interactor);

const booking_entry_dispatch_presenter = new BookingEntryDispatchPresenter();
const booking_entry_dispatch_interactor = new BookingEntryDispatchInteractor(booking_entry_dispatch_presenter);
const dispatch_controller = new BockingEntryDispatchController(booking_entry_dispatch_interactor);


window.addEventListener('DOMContentLoaded', (event) => {
    if (event.target.URL.indexOf('import.html') !== -1) {
        ipcRenderer.on('file:selected', (_event, path) => {
            import_controller.import_file(path);
        });

        let payments_link = document.getElementById('payments_link');
        payments_link.addEventListener('click', (_event) => {
            csv_file_import_presenter.show_payments(import_controller.payments);
        });

        let commit_button = document.getElementById("commit");
        commit_button.addEventListener('click', () => {
            ipcRenderer.send('import:commited', import_controller.booking_entries);
            // window.close();
            window.load()
        });
    } else if (event.target.URL.indexOf('dispatch.html') !== -1) {
        ipcRenderer.on('import:dispatch', (_event, booking_records) => {
            dispatch_controller.dispatch(booking_records);
        });

    }

});
