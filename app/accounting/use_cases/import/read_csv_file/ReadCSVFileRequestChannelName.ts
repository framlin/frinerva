import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/use_case/UseCaseRequestBoundary";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";

export type ReadCSVFileRequestChannelName
    = `${TUseCaseName}:${TGetPropertyNames<UseCaseRequestBoundary>}`
    | `${TUseCaseName}:next`;