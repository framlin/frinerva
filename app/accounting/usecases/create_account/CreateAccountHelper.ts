import {AccountingHelper} from "../../../common/persistence/helper/AccountingHelper";
import {UseCaseHelper} from "../../../common/usecase/UseCaseHelper";

export class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await AccountingHelper.load_cost_center_configuration();
    }

    async load_booking_period_configuration() {
        return await AccountingHelper.load_booking_period_configuration();
    }
}
