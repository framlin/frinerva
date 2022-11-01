import WebContents = Electron.WebContents;
import {UseCasePresenter} from "./UseCasePresenter";

export type TUseCasePresenterConstructor = { new(ipc_channel: WebContents): UseCasePresenter } & typeof UseCasePresenter;
