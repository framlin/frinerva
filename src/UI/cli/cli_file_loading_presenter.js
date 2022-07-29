const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const os = require('os');
const FileLoadingResponseBoundary = require("../../accounting/banking/file_loading/file_loading_response_boundary");

class CLIFileLoadingPresenter extends FileLoadingResponseBoundary {
    get file_loading_controller() {
        return this._file_loading_controller;
    }

    _file_loading_controller = null;

    constructor(file_loading_controller) {
        super();
        this._file_loading_controller = file_loading_controller;
    }

    file_name_missing() {
        inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
        inquirer
            .prompt([
                {
                    type: 'file-tree-selection',
                    name: 'file',
                    root: '../../../data/imports'
                }
            ])
            .then(answers => {
                let file_name = answers.file;
                console.log(`you chose: ${file_name}`);
                this.file_loading_controller.file_name = (file_name);
            });
    }
}

module.exports = CLIFileLoadingPresenter;