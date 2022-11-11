import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";
import {CreateAccountView} from "./ui/CreateAccountView";

export type CreateAccountResponseChannelName = `${UseCaseName}:${GetPropertyNames<CreateAccountResponseBoundary>}`;