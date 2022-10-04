import {UseCaseResponseBoundary} from "../../common/use_case/UseCaseResponseBoundary";

interface CreateAccountResponseBoundary extends UseCaseResponseBoundary {

    show_cost_center_list(cost_center_list: any): void;

    show_booking_period_list(booking_period_list: any): void;

    show_new_accounts_list(new_entry_list: any): void;

    show_error(error_object: any): void;

}

export {CreateAccountResponseBoundary}