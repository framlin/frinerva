import {Blueprint} from "../../../../common/usecase/Blueprint";
import {UseCaseHelper} from "../../../../common/usecase/UseCaseHelper";
import {DispatchBookingEntriesController} from "./DispatchBookingEntriesController";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {DispatchBookingEntriesPresenter} from "./DispatchBookingEntriesPresenter";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";
import {UseCase} from "../../../../common/usecase/UseCase";

export const dispatch_booking_entries: Blueprint = {
    controller: DispatchBookingEntriesController,
    helper: UseCaseHelper,
    interactor: DispatchBookingEntriesInteractor,
    presenter: DispatchBookingEntriesPresenter,
    usecase: UseCase,
    view: DispatchBookingEntriesView
}