const { ipcRenderer } = require('electron')

const ImportCSVBankingStatementsInteractor = require("../../../accounting/banking/csv_import/import_csv_banking_statements_interactor");
const CSVFileImportPresenter = require("./csv_file_import_presenter");
const CSVFileImportController = require("./csv_file_import_controller");

const csv_file_import_presenter = new CSVFileImportPresenter();
const import_csv_banking_statement_interactor =  new ImportCSVBankingStatementsInteractor(csv_file_import_presenter);
const import_controller = new CSVFileImportController(import_csv_banking_statement_interactor);


window.addEventListener('DOMContentLoaded', () => {

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
        window.close();
    })

});
