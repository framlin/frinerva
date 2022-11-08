import {UseCaseName} from "../../../../common/use_case/UseCaseName";
import {UseCaseResponseBoundary} from "../../../../common/use_case/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export type DispatchBookingEntriesResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;