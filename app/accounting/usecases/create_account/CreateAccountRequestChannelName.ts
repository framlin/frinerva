import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";
import {CreateAccountRequestBoundary} from "./CreateAccountRequestBoundary";

export type CreateAccountRequestChannelName = `${UseCaseName}:${GetPropertyNames<CreateAccountRequestBoundary>}`;