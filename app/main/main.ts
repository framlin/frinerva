import {app, BrowserWindow, Menu} from 'electron';
import {UseCaseFactory} from '../accounting/factories/UseCaseFactory';
import {DomainFactory} from './DomainFactory';
import {MainMenu} from "./MainMenu";
import {MainWindow} from "./MainWindow";

const DOMAINS = DomainFactory.get_domains();

const menuTemplate = MainMenu.createMenuTemplate(DomainFactory)

let mainWindow: MainWindow | null;
app.name = "Frinerva";

// @ts-ignore
Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

function create_main_window() {
    mainWindow = new MainWindow();
    mainWindow.UseCaseFactory = UseCaseFactory;
    DomainFactory.main_window = mainWindow;

    if (!process.env.APP_TEST_DRIVER) {
        mainWindow.loadFile('app/main/main.html').then().catch();
    } else {
        mainWindow.loadFile('main.html').then().catch();
    }

    mainWindow.once('ready-to-show', () => {
        for (let i = 0; i < DOMAINS.length; i++) {
            let domain = DomainFactory.create(DOMAINS[i]);
            if (mainWindow) mainWindow.add_domain(domain);
        }
        if (mainWindow) mainWindow.show();
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

