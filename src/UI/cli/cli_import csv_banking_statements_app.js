const ImportCSVBankingStatementsInteractor = require("../../accounting/banking/import_csv_banking_statements_interactor");

const CLIFileLoadingPresenter = require("./cli_file_loading_presenter");
const CLIPaymentCreationPresenter = require("./cli_payment_creation_presenter");
const CLIPaymentDisplayPresenter = require("./cli_payment_display_presenter");
const CLIPaymentConversionPresenter = require("./cli_payment_conversion_presenter");

const inquirer = require('inquirer');
const inquirerFileTreeSelection = require("inquirer-file-tree-selection-prompt");

const CLIImportController = require("./cli_import_controller");

async function prompt_for_file_name() {
    inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
    return await inquirer
        .prompt([
            {
                type: 'file-tree-selection',
                name: 'file',
                root: '../../../data/imports'
            }
        ]);
}

(function main() {
    const file_loading_response_boundary = new CLIFileLoadingPresenter();
    const payment_creation_response_boundary = new CLIPaymentCreationPresenter();
    const payment_conversion_response_boundary = new CLIPaymentConversionPresenter();
    const payment_display_response_boundary = new CLIPaymentDisplayPresenter();

    const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor({
        file_loading_response_boundary,
        payment_creation_response_boundary,
        payment_display_response_boundary,
        payment_conversion_response_boundary
    });

    const cli_import_controller = new CLIImportController(import_csv_banking_statement_interactor);

    let argv = require('minimist')(process.argv.slice(2));
    
    if (argv.name) {
        cli_import_controller.import_file(argv.name)
    } else {
        prompt_for_file_name().then((selection) => {
            cli_import_controller.import_file(selection.file);
        })
    }

})();


