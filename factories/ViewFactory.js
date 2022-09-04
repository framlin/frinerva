const ReadCSVFileView = require("../ui/electron/import/read_csv_file/ReadCSVFileView");
const MainWindow = require("../ui/electron/main/MainWindow");



const views = {
    read_csv_file: () => {
        let view = new ReadCSVFileView({parent: ViewFactory.MainWindow});
        view.loadFile('ui/electron/import/read_csv_file/read_csv_file.html').then();
        return view;
    },
    main: () => {
        if (!ViewFactory.MainWindow) {
            ViewFactory.MainWindow = new MainWindow();
            ViewFactory.MainWindow.loadFile('ui/electron/main/main.html').then();
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