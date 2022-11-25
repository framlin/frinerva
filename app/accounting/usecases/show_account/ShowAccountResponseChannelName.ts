import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {UseCaseResponseBoundary} from "../../../common/usecase/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowAccountResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;