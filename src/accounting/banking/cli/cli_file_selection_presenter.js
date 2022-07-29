const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const os = require('os');

class CLIFileSelectionPresenter {

    _controller = null;

    constructor(controller) {
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

    prompt_for_payment_creation(filename) {
        console.log(`you choosed ${filename.file}\n`);
        return true;
    }


}

module.exports = CLIFileSelectionPresenter;