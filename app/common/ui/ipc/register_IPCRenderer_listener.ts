import {ipcRenderer} from "electron";
import IpcRendererEvent = Electron.IpcRendererEvent;

export function register_IPCRenderer_listener<T extends string>(channel: T, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    ipcRenderer.removeAllListeners(channel);
    ipcRenderer.on(channel, listener);
    console.log(`Registered listener for channel '${channel}'`);
}