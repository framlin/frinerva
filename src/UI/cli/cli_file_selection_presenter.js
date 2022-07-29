const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const os = require('os');
const FileLoadingResponseBoundary = require("../../accounting/banking/file_loading/file_loading_response_boundary");

class CLIFileSelectionPresenter extends FileLoadingResponseBoundary{

    _controller = null;

    constructor(controller) {
        super();
        this._controller = controller;
    }

    set_request_boundary(request_boundary) {
        this._controller.request_boundary = request_boundary;
    }

    prompt_for_filename() {
        inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
        inquirer
            .prompt([
                {
                    type: 'file-tree-selection',
                    name: 'file',
                    root: os.homedir()
                }
            ])
            .then(answers => {
                console.log(JSON.stringify(answers))
                this._controller.file_name = answers.file;
            });
    }

}

module.exports = CLIFileSelectionPresenter;