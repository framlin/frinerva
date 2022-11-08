import {UseCaseName} from "../../../common/use_case/UseCaseName";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowAccountResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;