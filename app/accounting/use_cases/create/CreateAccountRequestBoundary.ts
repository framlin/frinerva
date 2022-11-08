import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {AccountHandle} from "../../entites/AccountHandle";
import {TBookingPeriodAccountDescriptionList} from "./TBookingPeriodAccountDescriptionList";

export interface CreateAccountRequestBoundary extends UseCaseRequestBoundary {
    create(new_accounts_list: AccountHandle[]): Promise<void>;

    period_cost_center_selection(period_cost_center: TBookingPeriodAccountDescriptionList): void;

}