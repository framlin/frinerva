import WebContents = Electron.WebContents;
import {UseCasePresenter} from "./UseCasePresenter";

export type UseCasePresenterConstructor = { new(ipc_channel: WebContents): UseCasePresenter } & typeof UseCasePresenter;
