const ReadCSVFileView = require("../ui/electron/accounting/import/read_csv_file/ReadCSVFileView");
const MainWindow = require("../ui/electron/main/MainWindow");



const views = {
    read_csv_file: () => {
        return new ReadCSVFileView();
    },
    main: () => {
        if (!ViewFactory.MainWindow) {
            ViewFactory.MainWindow = new MainWindow();
            ViewFactory.MainWindow.loadFile('app/ui/electron/main/main.html').then();
        }
        return ViewFactory.MainWindow;
    }
}
class ViewFactory {

    static MainWindow;

    static create(use_case_name){
        return views[use_case_name]();
    }
}

module.exports = ViewFactory;