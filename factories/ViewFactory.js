const ReadCSVFileView = require("../ui/electron/import/read_csv_file/ReadCSVFileView");
const views = {
    read_csv_file: () => {
        let view = new ReadCSVFileView();
        view.loadFile('ui/electron/import/read_csv_file/read_csv_file.html').then();
        return view;
    },
}
class ViewFactory {
    static create(use_case_name){
        return views[use_case_name]();
    }
}

module.exports = ViewFactory;