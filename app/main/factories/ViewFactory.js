const ReadCSVFileView = require("../../accounting/import/read_csv_file/ui/ReadCSVFileView");
const CreateAccountView = require("../../accounting/create/ui/CreateAccountView");

const views = {
    read_csv_file: (use_case_name) => {
        return new ReadCSVFileView(use_case_name);
    },
    create_account: (use_case_name) => {
        return new CreateAccountView(use_case_name);
    }
}

class ViewFactory {
    static create(use_case_name){
        return views[use_case_name](use_case_name);
    }
}

module.exports = ViewFactory;