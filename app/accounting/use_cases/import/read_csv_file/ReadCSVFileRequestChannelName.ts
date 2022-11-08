import {UseCaseName} from "../../../../common/use_case/UseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/use_case/UseCaseRequestBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";

export type ReadCSVFileRequestChannelName
    = `${UseCaseName}:${GetPropertyNames<UseCaseRequestBoundary>}`
    | `${UseCaseName}:next`;