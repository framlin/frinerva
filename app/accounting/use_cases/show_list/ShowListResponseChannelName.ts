import {UseCaseName} from "../../../common/use_case/UseCaseName";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowListResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;
