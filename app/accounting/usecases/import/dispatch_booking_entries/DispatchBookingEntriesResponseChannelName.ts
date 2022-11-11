import {UseCaseName} from "../../../../common/usecase/UseCaseName";
import {UseCaseResponseBoundary} from "../../../../common/usecase/UseCaseResponseBoundary";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export type DispatchBookingEntriesResponseChannelName = `${UseCaseName}:${GetPropertyNames<UseCaseResponseBoundary>}`;