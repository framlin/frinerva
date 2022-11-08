import {TUseCaseName} from "../../../common/use_case/TUseCaseName";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {TGetPropertyNames} from "../../../common/util/TGetPropertyNames";

export type ShowAccountResponseChannelName = `${TUseCaseName}:${TGetPropertyNames<UseCaseResponseBoundary>}`;