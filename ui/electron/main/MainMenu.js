const {app, shell} = require('electron')

const isMac = process.platform === 'darwin';

class MainMenu {
    static createMenuTemplate(UseCaseFactory) {
        return  [
            ...(isMac ? [{
                label: "Frinerva",
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []),
            // { role: 'fileMenu' }
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Import',
                        click: () => {
                            console.log("CLICK IMPORT")
                            UseCaseFactory.create('read_csv_file').execute()
                        }
                    },
                    isMac ? { role: 'close' } : { role: 'quit' }]},
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'resetZoom' },
                    { role: 'zoomIn' },
                    { role: 'zoomOut' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            // { role: 'windowMenu' }
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' },
                    ...(isMac ? [
                        { type: 'separator' },
                        { role: 'front' },
                        { type: 'separator' },
                        { role: 'window' }
                    ] : [
                        { role: 'close' }
                    ])
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Learn More',
                        click: async () => {
                            const { shell } = require('electron')
                            await shell.openExternal('https://electronjs.org')
                        }
                    }
                ]
            }

        ];

    }
}
module.exports = MainMenu;