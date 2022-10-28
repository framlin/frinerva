import {ipcMain} from "electron";
import IpcMainEvent = Electron.IpcMainEvent;

export function register_IPCMain_listener(channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void) {
    ipcMain.removeAllListeners(channel);
    ipcMain.on(channel, listener);
    console.log(`Registered listener for channel '${channel}'`);
}