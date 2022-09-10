const UseCaseView = require("../../../use_case/UseCaseView");
const path = require("path");
const {ipcMain} = require("electron");

let read_csv_file_view;
class ReadCSVFileView extends UseCaseView{
    constructor(config) {
        let win_config = {
            frame: false,
            hasShadow: true,
            roundedCorners: false
        }
        UseCaseView._merge_config(win_config, config);
        super(path.join(__dirname, 'ReadCSVFilePreloader.js'), win_config);
        read_csv_file_view = this;
        let parent_bounds = this.getParentWindow().getBounds();
        console.log(`PARENT BOUNDS: ${parent_bounds.width} X ${parent_bounds.height} @ x: ${parent_bounds.x} / y: ${parent_bounds.y}`)
        this.setBounds({ x: parent_bounds.x + 20, y: parent_bounds.y + 50,
            width: parent_bounds.width -40, height: parent_bounds.height - 75 })
        let child_bounds = this.getBounds();
        console.log(`PARENT BOUNDS: ${child_bounds.width} X ${child_bounds.height} @ x: ${child_bounds.x} / y: ${child_bounds.y}`)

    }
}

ipcMain.on('read-csv-file:import', () => {
    read_csv_file_view.forward('read_csv_file');
});
module.exports = ReadCSVFileView;