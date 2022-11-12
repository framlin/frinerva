import {ipcRenderer} from "electron";
import {IPCChannel} from "./IPCChannel";
import IpcRendererEvent = Electron.IpcRendererEvent;

export class ResponseChannel implements IPCChannel {

    constructor(
        private _sender?: Electron.WebContents,
    ) {}

    register_receiver<T extends string>(channel: T, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, listener);
        console.log(`Registered listener for response-channel '${channel}'`);
    }

    send<T extends string>(channel: T, ...args: any[]) {
        if (this._sender) {
            this._sender.send(channel, ...args);
        }
    }
}

export function create_response_channel(_sender?: Electron.WebContents ): ResponseChannel {
    return new ResponseChannel(_sender);
};