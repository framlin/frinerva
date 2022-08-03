const { ipcRenderer } = require('electron')

const ImportCSVBankingStatementsInteractor = require("../../../accounting/banking/csv_import/import_csv_banking_statements_interactor");
const CSVFileImportPresenter = require("./csv_file_import_presenter");
const CSVFileImportController = require("./csv_file_import_controller");


const import_controller = new CSVFileImportController(
    new ImportCSVBankingStatementsInteractor(
        new CSVFileImportPresenter()
    )
);


window.addEventListener('DOMContentLoaded', () => {

    ipcRenderer.on('file:selected', (_event, path) => {
        import_controller.import_file(path);
    });
});
