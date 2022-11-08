import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {UseCaseResponseBoundary} from "../../../../common/use_case/UseCaseResponseBoundary";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";

export type TShowListViewChannelName = `${TUseCaseName}:${TGetPropertyNames<UseCaseResponseBoundary>}`;
