import {TUseCaseName} from "../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../common/util/TGetPropertyNames";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";
import {CreateAccountView} from "./ui/CreateAccountView";

export type CreateAccountResponseChannelName = `${TUseCaseName}:${TGetPropertyNames<CreateAccountResponseBoundary>}`;