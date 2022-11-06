import {Blueprint} from "../../../../common/use_case/Blueprint";
import {UseCaseHelper} from "../../../../common/use_case/UseCaseHelper";
import {DispatchBookingEntriesController} from "./DispatchBookingEntriesController";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";
import {DispatchBookingEntriesPresenter} from "./DispatchBookingEntriesPresenter";
import {DispatchBookingEntriesView} from "./ui/DispatchBookingEntriesView";
import {UseCase} from "../../../../common/use_case/UseCase";

export const dispatch_booking_entries: Blueprint = {
    controller: DispatchBookingEntriesController,
    helper: UseCaseHelper,
    interactor: DispatchBookingEntriesInteractor,
    presenter: DispatchBookingEntriesPresenter,
    usecase: UseCase,
    view: DispatchBookingEntriesView
}