import {CreateAccountInteractor} from "../CreateAccountInteractor";
import {UseCaseHelper} from "../../../../common/usecase/UseCaseHelper";
import {DomainEntity} from "../../../../common/domain/DomainEntity";
import {Observatory} from "../../../../common/observation/Observatory";
import {DomainHelper} from "../../../../common/domain/DomainHelper";
import {AccountingHelper} from "../../../../common/persistence/helper/AccountingHelper";
import {CreateAccountPresenter} from "../CreateAccountPresenter";
import {CreateAccountHelper} from "../CreateAccountHelper";
import {AccountHandle} from "../../../entites/AccountHandle";
import {Account} from "../../../entites/Account";


class DomainEntityMock extends DomainEntity {
    provide_at(observatory: Observatory): void {
    }
    async create_account({booking_period, cost_center}: AccountHandle): Promise<Account | null> {
        return null;
    }
}

class ipcChannelMock {
    send() {
    }
}

const ipc_channel = new ipcChannelMock();


const create_account_presenter_spy = jest.spyOn(CreateAccountPresenter.prototype, 'show_cost_center_list');
const create_account_presenter_spy_2 = jest.spyOn(CreateAccountPresenter.prototype, 'show_booking_period_list');
const create_account_presenter_spy_3 = jest.spyOn(CreateAccountPresenter.prototype, 'show_new_accounts_list');

function mock_accounting_helper(){
    jest.spyOn(AccountingHelper, 'load_cost_center_configuration').mockImplementation(() => {
        return Promise.resolve(JSON.stringify(['cost_center_1', 'cost_center_2']));
    });
}



let accounting: DomainEntity;
let interactor: CreateAccountInteractor;
let presenter: CreateAccountPresenter;
const helper = new CreateAccountHelper();


describe('CreateAccountInteractor', () => {
    beforeEach(() => {
        mock_accounting_helper();
        accounting = new DomainEntityMock(AccountingHelper);
        // @ts-expect-error
        presenter = new CreateAccountPresenter(ipc_channel);
        interactor = new CreateAccountInteractor(accounting, presenter, helper);
    });

    it('can be created', () => {
        expect(interactor).toBeInstanceOf(CreateAccountInteractor);
    });

    it('calls show_cost_center_list of presenter, if execute is called', async () => {
        await interactor.execute();
        expect(create_account_presenter_spy).toBeCalled();
    });

    it('calls show_booking_period_list of presenter, if execute is called', async () => {
        await interactor.execute();
        expect(create_account_presenter_spy_2).toBeCalled();
    });

    it('calls show_new_accounts_list of presenter, if period_cost_center_selection is called', async () => {
        const pccs = {periods: ['1'], accounts: [{key: "A!1", label: "A1"}]};
        await interactor.period_cost_center_selection(pccs);
        expect(create_account_presenter_spy_3).toBeCalled();
        expect(create_account_presenter_spy_3).toBeCalledWith([
            {booking_period: '1', cost_center: 'A!1', label: 'A1'}
        ]);
    });

    it(' calls show_error if create is called and account already exists', async () => {
        const create_account_presenter_spy = jest.spyOn(CreateAccountPresenter.prototype, 'show_error');
        await interactor.create([{booking_period: '1', cost_center: 'A'}]);
        expect(create_account_presenter_spy).toBeCalled();
        expect(create_account_presenter_spy).toBeCalledWith({error: 'ACCOUNT_EXIST', booking_period: '1', cost_center: 'A'});
    });

    it(' calls account_creation_done if create is called and account did not exist', async () => {
        const create_account_presenter_spy = jest.spyOn(CreateAccountPresenter.prototype, 'account_creation_done');
        const create_account = jest.spyOn(DomainEntityMock.prototype, 'create_account').mockImplementation(async ({booking_period, cost_center}) => {
            return new Account({booking_period, cost_center});
        });
        await interactor.create([{booking_period: '1', cost_center: 'A'}]);
        expect(create_account_presenter_spy).toBeCalled();
    });


});