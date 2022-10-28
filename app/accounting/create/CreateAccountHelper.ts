import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {AccountingHelper} from "../../common/persistence/helper/AccountingHelper";

class CreateAccountHelper extends UseCaseHelper{
    async load_cost_center_configuration() {
        return await AccountingHelper.load_cost_center_configuration();
    }

    async load_booking_period_configuration() {
        return await AccountingHelper.load_booking_period_configuration();
    }
}

export {CreateAccountHelper}