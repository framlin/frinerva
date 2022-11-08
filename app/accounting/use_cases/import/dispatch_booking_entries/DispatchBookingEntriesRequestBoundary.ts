import {UseCaseRequestBoundary} from "../../../../common/use_case/UseCaseRequestBoundary";
import {AccountData} from "../../../entites/Account";

export interface DispatchBookingEntriesRequestBoundary extends UseCaseRequestBoundary {
    submit(virtual_account: AccountData):void;
}