import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {UseCaseResponseBoundary} from "../../../common/usecase/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowListResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;
