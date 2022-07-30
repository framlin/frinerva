const ImportCSVBankingStatementsInteractor = require("../../accounting/banking/import_csv_banking_statements_interactor");

const CLIFileLoadingController = require('./cli_file_loading_controller');
const CLIFileLoadingPresenter = require("./cli_file_loading_presenter");

const CLIPaymentCreationController = require("./cli_payment_creation_controller");
const CLIPaymentCreationPresenter = require("./cli_payment_creation_presenter");

const CLIPaymentDisplayController = require("./cli_payment_display_controller");
const CLIPaymentDisplayPresenter = require("./cli_payment_display_presenter");
const CLIPaymentConversionController = require("./cli_payment_conversion_controller");
const CLIPaymentConversionPresenter = require("./cli_payment_conversion_presenter");

(function main() {
    const cli_file_loading_controller = new CLIFileLoadingController();
    const cli_payment_creation_controller = new CLIPaymentCreationController();
    const cli_payment_conversion_controller = new CLIPaymentConversionController();
    const cli_payment_display_controller = new CLIPaymentDisplayController();

    const file_loading_response_boundary = new CLIFileLoadingPresenter(cli_file_loading_controller);
    const payment_creation_response_boundary = new CLIPaymentCreationPresenter(cli_payment_creation_controller);
    const payment_conversion_response_boundary = new CLIPaymentConversionPresenter(cli_payment_creation_controller);
    const payment_display_response_boundary = new CLIPaymentDisplayPresenter(cli_payment_creation_controller);

    const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor({
        file_loading_response_boundary,
        payment_creation_response_boundary,
        payment_display_response_boundary,
        payment_conversion_response_boundary
    });

    cli_file_loading_controller.file_loading_request_boundary = import_csv_banking_statement_interactor.file_loading_request_boundary;
    cli_payment_creation_controller.payment_creation_response_boundary = import_csv_banking_statement_interactor.payment_creation_response_boundary;
    cli_payment_conversion_controller.payment_conversion_response_boundary = import_csv_banking_statement_interactor.payment_conversion_response_boundary;
    cli_payment_display_controller.payment_display_response_boundary = import_csv_banking_statement_interactor.payment_display_response_boundary;

    import_csv_banking_statement_interactor.execute_use_case("/Users/framlin/js-dev/frinerva/data/imports/2019.csv").then( booking_entries => {
        console.log("done");
    });
})();


