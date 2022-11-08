import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";
import {CreateAccountResponseBoundary} from "../CreateAccountResponseBoundary";
import {CreateAccountView} from "./CreateAccountView";

export type TCreateAccountViewChannelName = `${TUseCaseName}:${TGetPropertyNames<CreateAccountResponseBoundary>}`;