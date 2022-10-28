import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {UseCase} from "../../../common/use_case/UseCase";
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";

export class DispatchBookingEntries extends UseCase {

    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, 'accounting', 'dispatch_booking_entries', presenter);
    }
}
