import {UseCaseResponseBoundary} from "../../../common/usecase/UseCaseResponseBoundary";
import {AccountDescriptionLabel} from "./AccountDescriptionLabel";

export interface CreateAccountResponseBoundary extends UseCaseResponseBoundary {
    show_cost_center_list(cost_center_list: string[]): void;

    show_booking_period_list(booking_period_list: string[]): void;

    show_new_accounts_list(new_entry_list: AccountDescriptionLabel[]): void;

    show_error(error_object: any): void;

    account_creation_done(): void;
}
