import {TUseCaseName} from "../../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../../common/util/TGetPropertyNames";
import {DispatchBookingEntriesView} from "./DispatchBookingEntriesView";

export type TDispatchBookingEntriesViewChannelName = `${TUseCaseName}:${TGetPropertyNames<DispatchBookingEntriesView>}`;