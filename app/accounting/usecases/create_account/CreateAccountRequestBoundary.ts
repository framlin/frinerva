import {UseCaseRequestBoundary} from "../../../common/usecase/UseCaseRequestBoundary";
import {AccountHandle} from "../../entites/AccountHandle";
import {BookingPeriodAccountDescriptionList} from "./BookingPeriodAccountDescriptionList";

export interface CreateAccountRequestBoundary extends UseCaseRequestBoundary {
    create(new_accounts_list: AccountHandle[]): Promise<void>;

    period_cost_center_selection(period_cost_center: BookingPeriodAccountDescriptionList): void;

}