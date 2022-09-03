const ReadCSVFileHelper = require("../business/accounting/import/read_csv_file/ReadCSVFileHelper");
const helper = {
    read_csv_file: ReadCSVFileHelper,
}
class HelperFactory{
    static create(use_case_name) {
        return new helper[use_case_name]();
    }
}

module.exports = HelperFactory;