import {Blueprint} from "../../../../common/use_case/Blueprint";
import {UseCaseHelper} from "../../../../common/use_case/UseCaseHelper";
import {DispatchBookingEntries} from "./DispatchBookingEntries";
import {DispatchBookingEntriesController} from "./DispatchBookingEntriesController";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {DispatchBookingEntriesPresenter} from "./DispatchBookingEntriesPresenter";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export const dispatch_booking_entries: Blueprint = {
    controller: DispatchBookingEntriesController,
    helper: UseCaseHelper,
    interactor: DispatchBookingEntriesInteractor,
    presenter: DispatchBookingEntriesPresenter,
    usecase: DispatchBookingEntries,
    view: DispatchBookingEntriesView
}