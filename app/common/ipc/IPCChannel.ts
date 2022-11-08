export interface IPCChannel {
    register_receiver<T extends string>(channel: T, listener: (event: any, ...args: any[]) => void): void;
    send<T extends string>(channel: T, ...args: any[]): void;
}
