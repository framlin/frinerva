"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntries = void 0;
const UseCase_1 = require("../../../common/use_case/UseCase");
class DispatchBookingEntries extends UseCase_1.UseCase {
    constructor(_UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'dispatch_booking_entries');
    }
}
exports.DispatchBookingEntries = DispatchBookingEntries;
module.exports = { DispatchBookingEntries };
//# sourceMappingURL=DispatchBookingEntries.js.map