import {UseCase} from "../../../../common/use_case/UseCase";
import {UseCasePresenter} from "../../../../common/use_case/UseCasePresenter";
import {UseCaseFactory} from "../../../factories/UseCaseFactory";

export class DispatchBookingEntries extends UseCase {

    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, presenter, 'accounting', 'dispatch_booking_entries');
    }
}
