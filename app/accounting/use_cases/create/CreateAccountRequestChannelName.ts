import {TUseCaseName} from "../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../common/util/TGetPropertyNames";
import {CreateAccountRequestBoundary} from "./CreateAccountRequestBoundary";

export type CreateAccountRequestChannelName = `${TUseCaseName}:${TGetPropertyNames<CreateAccountRequestBoundary>}`;