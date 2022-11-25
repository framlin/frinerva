import {Blueprint} from "../../../../common/usecase/Blueprint";
import {DispatchBookingEntriesController} from "./DispatchBookingEntriesController";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {DispatchBookingEntriesPresenter} from "./DispatchBookingEntriesPresenter";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";

export const dispatch_booking_entries: Blueprint = {
    controller: DispatchBookingEntriesController,
    interactor: DispatchBookingEntriesInteractor,
    presenter: DispatchBookingEntriesPresenter,
    view: DispatchBookingEntriesView
}