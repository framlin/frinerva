import {UseCaseName} from "../../../../common/use_case/UseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/use_case/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../../common/use_case/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";
import {DispatchBookingEntriesRequestBoundary} from "./DispatchBookingEntriesRequestBoundary";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export type DispatchBookingEntriesRequestChannelName
    = `${UseCaseName}:${GetPropertyNames<DispatchBookingEntriesRequestBoundary>}`;