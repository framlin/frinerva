const CLIFileLoadingController = require('./cli_file_loading_controller');
const ImportCSVBankingStatementsInteractor = require("../../accounting/banking/import_csv_banking_statements_interactor");
const CLIFileLoadingPresenter = require("./cli_file_loading_presenter");
const CLIPaymentCreationController = require("./cli_payment_creation_controller");
const CLIPaymentCreationPresenter = require("./cli_payment_creation_presenter");

(function main() {
    const cli_file_loading_controller = new CLIFileLoadingController();
    const cli_payment_creation_controller = new CLIPaymentCreationController();
    const file_loading_response_boundary = new CLIFileLoadingPresenter(cli_file_loading_controller);
    const payment_creation_response_boundary = new CLIPaymentCreationPresenter(cli_payment_creation_controller);
    const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor({
        file_loading_response_boundary,
        payment_creation_response_boundary
    });
    cli_file_loading_controller.file_loading_request_boundary = import_csv_banking_statement_interactor.file_loading_request_boundary;
    import_csv_banking_statement_interactor.execute_use_case("/home/framlin/js-dev/frinerva/data/imports/2019.csv").then( payments => {
        console.log("done");
    });
})();


