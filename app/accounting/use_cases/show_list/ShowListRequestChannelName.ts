import {UseCaseName} from "../../../common/use_case/UseCaseName";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";

export type ShowListRequestChannelName =
    `${UseCaseName}:${GetPropertyNames<UseCaseRequestBoundary>}`
    | `${UseCaseName}:account_selected`;
