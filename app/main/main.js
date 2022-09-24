const {app, BrowserWindow, Menu} = require('electron')
const MainWindow = require("./MainWindow");
const UseCaseFactory = require('../accounting/factories/UseCaseFactory');

const DomainFactory = require('./DomainFactory');
const DOMAINS = DomainFactory.get_domains();

const menuTemplate = require('./MainMenu').createMenuTemplate(DomainFactory);

let mainWindow;
app.name = "Frinerva";

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

function create_main_window() {
    mainWindow = new MainWindow();
    mainWindow.UseCaseFactory = UseCaseFactory;
    DomainFactory.main_window = mainWindow;

    for(let i = 0; i < DOMAINS.length; i++) {
        let domain = DomainFactory.create(DOMAINS[i]);
        mainWindow.add_domain(domain);
    }

    if (!process.env.APP_TEST_DRIVER) {
        mainWindow.loadFile('app/main/main.html').then().catch();
    } else {
        mainWindow.loadFile('main.html').then().catch();
    }

    mainWindow.once('ready-to-show', () => {
        for(let i = 0; i < DOMAINS.length; i++) {
            let domain = DomainFactory.create(DOMAINS[i]);
            mainWindow.add_domain(domain);
        }
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

//================================    TEST     ==================================
const METHODS = require('./__test__/electron_tests');

const onMessage = async ({msgId, cmd, args}) => {
    let method = METHODS[cmd];
    if (!method) method = () => new Error('Invalid method: ' + cmd)
    try {
        const resolve = await method(...args)
        process.send({msgId, resolve})
    } catch (err) {
        const reject = {
            message: err.message,
            stack: err.stack,
            name: err.name
        }
        process.send({msgId, reject})
    }
}

if (process.env.APP_TEST_DRIVER) {
    process.on('message', onMessage)
}