import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {UseCaseRequestBoundary} from "../../../../common/use_case/UseCaseRequestBoundary";
import {UseCaseResponseBoundary} from "../../../../common/use_case/UseCaseResponseBoundary";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";
import {DispatchBookingEntriesRequestBoundary} from "./DispatchBookingEntriesRequestBoundary";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export type DispatchBookingEntriesRequestChannelName
    = `${TUseCaseName}:${TGetPropertyNames<DispatchBookingEntriesRequestBoundary>}`;