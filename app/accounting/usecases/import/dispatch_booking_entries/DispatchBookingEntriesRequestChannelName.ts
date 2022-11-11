import {UseCaseName} from "../../../../common/usecase/UseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/usecase/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../../common/usecase/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";
import {DispatchBookingEntriesRequestBoundary} from "./DispatchBookingEntriesRequestBoundary";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export type DispatchBookingEntriesRequestChannelName
    = `${UseCaseName}:${GetPropertyNames<DispatchBookingEntriesRequestBoundary>}`;