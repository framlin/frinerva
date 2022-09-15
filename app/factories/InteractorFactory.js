const ReadCSVFileInteractor = require("../business/accounting/import/read_csv_file/ReadCSVFileInteractor");
const CreateAccountInteractor = require("../business/accounting/create/CreateAccountInteractor");

const interactors = {
    read_csv_file: ReadCSVFileInteractor,
    create_account: CreateAccountInteractor,
}
class InteractorFactory{
    static create(use_case_name) {
        return new interactors[use_case_name]();
    }
}

module.exports = InteractorFactory;