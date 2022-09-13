const ReadCSVFileView = require("../ui/electron/accounting/import/read_csv_file/ReadCSVFileView");

const views = {
    read_csv_file: () => {
        return new ReadCSVFileView();
    },
}

class ViewFactory {
    static create(use_case_name){
        return views[use_case_name]();
    }
}

module.exports = ViewFactory;