const inquirer = require('inquirer');
const inquirerFileTreeSelection = require("inquirer-file-tree-selection-prompt");

const ImportCSVBankingStatementsInteractor = require("../../../use_cases/import/ImportCSVBankingStatementsInteractor");
const CLIImportController = require("./CLIImportController");
const CLICSVImportPresenter = require("./CLIImportCSVPresenter");

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
    const csv_file_import_response_boundary = new CLICSVImportPresenter();
    const import_csv_banking_statement_interactor = new ImportCSVBankingStatementsInteractor(csv_file_import_response_boundary);
    const cli_import_controller = new CLIImportController(import_csv_banking_statement_interactor);

    let argv = require('minimist')(process.argv.slice(2));

    if (argv.file) {
        cli_import_controller.import_file(argv.file)
    } else {
        prompt_for_file_name().then((selection) => {
            cli_import_controller.import_file(selection.file);
        });
    }
})();


