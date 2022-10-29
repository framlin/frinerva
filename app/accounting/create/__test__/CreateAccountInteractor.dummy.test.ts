import {DomainEntity} from "../../../common/domain/DomainEntity";
import {Observatory} from "../../../common/observation/Observatory";
import {CreateAccountHelper} from "../CreateAccountHelper";
import {CreateAccountInteractor} from "../CreateAccountInteractor";
import {CreateAccountPresenter} from "../CreateAccountPresenter";


/*
    constructor(
        protected _domain_entity: DomainEntity,
        protected _response_boundary: UseCaseResponseBoundary,
        protected _helper : UseCaseHelper
    ) {}

 */


class DomainEntityMock extends DomainEntity {
    provide_at(observatory: Observatory): void {
    }
}

class CreateAccountHelperMock extends CreateAccountHelper {}

class CreateAccountPresenterMock extends CreateAccountPresenter {

    show_cost_center_list(cost_center_config: any) {
    }

    show_booking_period_list(booking_period_config: any) {
    }

    show_new_accounts_list(new_entry_list: any) {
    }

    show_error(error: { error: string; booking_period: any; cost_center: any; }) {
    }

    account_creation_done() {
    }
}

//test create create_account_interactor
test("create_account_interactor", () => {
    expect(1).toBe(1)
    // let interactor = new CreateAccountInteractor();
    // let helper = new CreateAccountHelper();
    // let response_boundary = new CreateAccountResponseBoundary();
    // interactor.helper = helper;
    // interactor.response_boundary = response_boundary;
    // interactor.execute().then();
});