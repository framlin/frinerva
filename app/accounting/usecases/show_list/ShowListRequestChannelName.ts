import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {UseCaseRequestBoundary} from "../../../common/usecase/UseCaseRequestBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowListRequestChannelName =
    `${UseCaseName}:${GetPropertyNames<UseCaseRequestBoundary>}`
    | `${UseCaseName}:account_selected`;
