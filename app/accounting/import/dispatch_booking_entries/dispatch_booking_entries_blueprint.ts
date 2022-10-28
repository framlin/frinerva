import {DispatchBookingEntriesController} from "./DispatchBookingEntriesController";
import {DispatchBookingEntries} from "./DispatchBookingEntries";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {UseCaseHelper} from "../../../common/use_case/UseCaseHelper";
import {DispatchBookingEntriesPresenter} from "./DispatchBookingEntriesPresenter";
import {Blueprint} from "../../../common/use_case/Blueprint";

export const dispatch_booking_entries_blueprint: Blueprint = {
    controller: DispatchBookingEntriesController,
    helper: UseCaseHelper,
    interactor: DispatchBookingEntriesInteractor,
    presenter: DispatchBookingEntriesPresenter,
    usecase: DispatchBookingEntries,
    view: DispatchBookingEntriesView
}