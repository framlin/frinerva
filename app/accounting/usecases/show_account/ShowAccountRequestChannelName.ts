import {UseCaseName} from "../../../common/usecase/UseCaseName";
import {UseCaseRequestBoundary} from "../../../common/usecase/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../common/usecase/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";
import {ShowAccountRequestBoundary} from "./ShowAccountRequestBoundary";

export type ShowAccountRequestChannelName = `${UseCaseName}:${GetPropertyNames<ShowAccountRequestBoundary>}`;