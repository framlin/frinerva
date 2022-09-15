// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const MainWindow = require("./MainWindow");
const UseCaseFactory = require('../../../factories/UseCaseFactory');
const PresenterFactory = require("../../../factories/PresenterFactory");
const InteractorFactory = require("../../../factories/InteractorFactory");
const ControllerFactory = require("../../../factories/ControllerFactory");
const HelperFactory = require("../../../factories/HelperFactory");

const menuTemplate = require('./MainMenu').createMenuTemplate(UseCaseFactory);

let mainWindow;

app.name = "Frinerva";

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

function create_main_window() {
  mainWindow = new MainWindow();
  mainWindow.UseCaseFactory = UseCaseFactory;
  mainWindow.loadFile('app/ui/electron/main/main.html').then();
  mainWindow.once('ready-to-show', () => {
    UseCaseFactory.config(PresenterFactory, InteractorFactory, ControllerFactory, HelperFactory, mainWindow.webContents);
    mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  create_main_window();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      if (!mainWindow) {
        create_main_window()
      }
    }
  });
});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit()
  app.quit();
  mainWindow = null;
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
