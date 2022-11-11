import {UseCaseName} from "../../../../common/usecase/UseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/usecase/UseCaseRequestBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";

export type ReadCSVFileRequestChannelName
    = `${UseCaseName}:${GetPropertyNames<UseCaseRequestBoundary>}`
    | `${UseCaseName}:next`;