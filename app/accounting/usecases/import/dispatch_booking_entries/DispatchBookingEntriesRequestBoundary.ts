import {UseCaseRequestBoundary} from "../../../../common/usecase/UseCaseRequestBoundary";
import {AccountData} from "../../../entites/Account";

export interface DispatchBookingEntriesRequestBoundary extends UseCaseRequestBoundary {
    submit(virtual_account: AccountData):void;
}