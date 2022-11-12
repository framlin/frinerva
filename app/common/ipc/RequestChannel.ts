import {ipcMain} from "electron";
import {IPCChannel} from "./IPCChannel";
import {ipcRenderer} from "electron";

export class RequestChannel implements IPCChannel {

    register_receiver<T extends string>(channel: T, listener: (event: any, ...args: any[]) => void) {
        ipcMain.removeAllListeners(channel);
        ipcMain.on(channel, listener);
        console.log(`Registered listener for request-channel '${channel}'`);
    }

    send<T extends string>(channel: T, ...args: any[]) {
        ipcRenderer.send(channel, ...args);
    }
}

export function create_request_channel(): RequestChannel {
    return new RequestChannel();
}