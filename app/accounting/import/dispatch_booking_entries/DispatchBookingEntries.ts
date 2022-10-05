import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {UseCase} from "../../../common/use_case/UseCase";

class DispatchBookingEntries extends UseCase{

    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'dispatch_booking_entries');
    }
}

module.exports = {DispatchBookingEntries};
export {DispatchBookingEntries}