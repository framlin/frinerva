const electron = require("electron");

const ImportCSVBankingStatementsInteractor = require("../../../accounting/banking/csv_import/import_csv_banking_statements_interactor");
const CSVFileImportPresenter = require("./csv_file_import_presenter");
const CSVFileImportController = require("./csv_file_import_controller");


const csv_file_import_response_boundary = new CSVFileImportPresenter();
const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor(csv_file_import_response_boundary);
const import_controller = new CSVFileImportController(import_csv_banking_statement_interactor);


window.addEventListener('DOMContentLoaded', () => {


    let file_picker = document.getElementById("file_picker");
    file_picker.addEventListener("change", handleFiles, false);
    function handleFiles() {
        let file = this.files[0];
        import_controller.import_file(file.path);
    }
});