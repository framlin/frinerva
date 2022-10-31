import {UseCaseFactory} from "../../../accounting/factories/UseCaseFactory";
import {AccountingHelper} from "../../persistence/helper/AccountingHelper";
import {UseCase} from "../UseCase";
import {UseCaseController} from "../UseCaseController";
import {UseCaseInteractor} from "../UseCaseInteractor";
import {UseCasePresenter} from "../UseCasePresenter";

class InteractorStub extends  UseCaseInteractor {
    execute(...data: any[]): any {}
}

// @ts-ignore
const use_case_presenter = new UseCasePresenter({});

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

describe('UseCaseController', () => {
    it('should be able to instantiate', () => {
        // Arrange
        mock_use_case_presenter();
        stub_use_case_factory();
        spy_on_controller();
        // @ts-ignore DomainEntity
        const interactor = new InteractorStub({}, {}, new AccountingHelper());
        const use_case = new UseCase(UseCaseFactory, use_case_presenter, "", "");
        // Act
        const use_case_controller = new UseCaseController(interactor, use_case);
        // Assert
        expect(use_case_controller).toBeInstanceOf(UseCaseController);
    });
});