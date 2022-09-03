const ReadCSVFileView = require("../ui/electron/use_cases/import/read_csv_file/ReadCSVFileView");
const views = {
    read_csv_file: ReadCSVFileView,
}
class ViewFactory {
    static create(use_case_name){
        return new views[use_case_name]();
    }
}

module.exports = ViewFactory;