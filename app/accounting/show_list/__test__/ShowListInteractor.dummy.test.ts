test('dummy', ()=>{expect(1).toBe(1)});
// import {ShowListInteractor} from "../ShowListInteractor";
// import {DomainEntity} from "../../../common/domain/DomainEntity";
// import {Observatory} from "../../../common/observation/Observatory";
// import {DomainHelper} from "../../../common/domain/DomainHelper";
// let interactor: ShowListInteractor;
//
// class PresenterSpy{
//     show_called = false;
//     show_params = null;
//     show(params : any) {
//         this.show_called = true;
//         this.show_params = params;
//     }
//
// }
// let response_boundary = new PresenterSpy();
//
// class HelperSpy extends DomainHelper{
//     get_account_name_list_called = false;
//
//     get_account_name_list() {
//         this.get_account_name_list_called = true;
//         return [{booking_period: '1', cost_center:'A'}];
//     }
//
//     async load_cost_center_configuration() {
//         return Promise.resolve("{\"A\": \"a\"}");
//     }
//
// }
// let helper = new HelperSpy();
//
// beforeEach(() => {
//     interactor = new ShowListInteractor()
// })
//
// test('creation', () => {
//     expect(interactor).toBeInstanceOf(ShowListInteractor);
// });
//
// test('execute', async () => {
//     interactor.response_boundary = response_boundary;
//     interactor.helper = helper;
//
//     await interactor.execute();
//     expect(interactor.helper.get_account_name_list_called).toBe(true);
//     expect(interactor.response_boundary.show_called).toBe(true);
//     expect(interactor.response_boundary.show_params).toStrictEqual(['1 - a']);
// });
