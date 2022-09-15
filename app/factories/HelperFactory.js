const ReadCSVFileHelper = require("../business/accounting/import/read_csv_file/ReadCSVFileHelper");
const CreateAccountHelper = require("../business/accounting/create/CreateAccountHelper");

const helper = {
    read_csv_file: ReadCSVFileHelper,
    create_account: CreateAccountHelper,
}
class HelperFactory{
    static create(use_case_name) {
        return new helper[use_case_name]();
    }
}

module.exports = HelperFactory;