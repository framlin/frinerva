// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const MainWindow = require("./main_window");
const ImportWindow = require("./import/import_window");
const AccountWindow = require("./acoount_management/account_window");

const menuTemplate = require('./main_menu').createMenuTemplate(open_import_window);

let mainWindow, importWindow, accountWindow ;

function open_import_window() {
  importWindow = new ImportWindow(mainWindow);
}

function open_account_window() {
  accountWindow = new AccountWindow(mainWindow);
}

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  mainWindow = new MainWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = new MainWindow();
  });

  ipcMain.on('import:commited', (event, booking_entries) => {
    open_account_window();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
