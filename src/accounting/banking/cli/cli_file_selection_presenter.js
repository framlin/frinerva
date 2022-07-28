const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const os = require('os');

class CLIFileSelectionPresenter {

    async prompt_for_filename() {
        inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
        let filename = await inquirer
            .prompt([
                {
                    type: 'file-tree-selection',
                    name: 'file',
                    root: os.homedir()
                }
            ]);
        return filename;
    }

    prompt_for_payment_creation(filename) {
        console.log(`you choosed ${filename.file}\n`);
        return true;
    }


}

module.exports = CLIFileSelectionPresenter;