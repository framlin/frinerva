import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";
import {ShowAccountView} from "./ShowAccountView";

export type TShowAccountViewChannelName = `${TUseCaseName}:${TGetPropertyNames<ShowAccountView>}`;