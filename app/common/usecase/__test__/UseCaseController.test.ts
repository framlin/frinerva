import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {AccountingHelper} from "../../persistence/helper/AccountingHelper";
import {UseCase} from "../UseCase";
import {UseCaseController} from "../UseCaseController";
import {UseCaseInteractor} from "../UseCaseInteractor";
import {UseCasePresenter} from "../UseCasePresenter";
import {Observatory} from "../../observation/Observatory";

class InteractorStub extends  UseCaseInteractor {
    execute(...data: any[]): any {}
}

function mock_use_case_presenter() {
    UseCasePresenter.prototype.show = jest.fn().mockImplementation((...data: unknown[]) => {});
    UseCasePresenter.prototype.execute = jest.fn().mockImplementation(() => {});
}

function stub_use_case_factory() {
    // @ts-ignore
    UseCaseFactory.create = jest.fn().mockImplementation(() => {
        return {
            execute: (...data: any[]) => {}
        } as UseCase;
    });
}

function spy_on_controller() {
    // @ts-ignore protected method
    jest.spyOn(UseCaseController.prototype, 'register_ipc_listener').mockImplementation(() => {});
}

// @ts-ignore
const use_case_presenter = new UseCasePresenter({});


describe('UseCaseController', () => {
    mock_use_case_presenter();
    stub_use_case_factory();
    spy_on_controller();


    let interactor: InteractorStub;
    let use_case_controller: UseCaseController;
    let use_case: UseCase;
    const observatory = new Observatory()

    beforeEach(() => {
        // @ts-ignore DomainEntity
         interactor = new InteractorStub({}, {}, new AccountingHelper());
         use_case = new UseCase(UseCaseFactory, use_case_presenter, "show_list", "");
         use_case_controller = new UseCaseController(interactor, use_case, observatory);
    });


    it('should be able to instantiate', () => {
        // Act
        const use_case_controller = new UseCaseController(interactor, use_case, observatory);
        // Assert
        expect(use_case_controller).toBeInstanceOf(UseCaseController);
    });

    it('calls interactor.execute if execute is called', () => {
        // Arrange
        const spy = jest.spyOn(interactor, 'execute');
        // Act
        use_case_controller.execute("hallo");
        // Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("hallo");
    });

    it('calls use_case.forward if forward is called', () => {
        // Arrange
        const spy = jest.spyOn(use_case, 'forward');
        // Act
        use_case_controller.forward("show_list");
        // Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("show_list");
    });

    it('cals execute if on_use_case_ready is called', () => {
        // Arrange
        const spy = jest.spyOn(use_case_controller, 'execute');
        // Act
        use_case_controller.on_use_case_view_ready();
        // Assert
        expect(spy).toHaveBeenCalled();
    });
});