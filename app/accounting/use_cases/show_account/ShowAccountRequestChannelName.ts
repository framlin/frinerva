import {UseCaseName} from "../../../common/use_case/UseCaseName";
import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../common/use_case/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../common/util/GetPropertyNames";
import {ShowAccountRequestBoundary} from "./ShowAccountRequestBoundary";

export type ShowAccountRequestChannelName = `${UseCaseName}:${GetPropertyNames<ShowAccountRequestBoundary>}`;