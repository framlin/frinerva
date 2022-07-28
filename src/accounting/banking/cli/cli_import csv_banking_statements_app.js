const CLIController = require('./cli_controller');
const ImportCSVBankingStatementsInteractor = require("../import_csv_banking_statements_interactor");
const CLIFileSelectionPresenter = require("./cli_file_selection_presenter");

(function main() {
    const cli_controller = new CLIController();
    const cli_file_selection_presenter = new CLIFileSelectionPresenter();
    const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor(cli_file_selection_presenter);
    import_csv_banking_statement_interactor.execute_use_case();
})();

