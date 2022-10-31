//test creation of use case
import {UseCaseFactory} from "../../../accounting/factories/UseCaseFactory";
import {UseCase} from "../UseCase";
import {UseCasePresenter} from "../UseCasePresenter";

describe('UseCase', () => {

    class UseCaseFactoryStub extends UseCaseFactory {
        static create(use_case_name: string): UseCase {
            return {
                execute: (...data: any[]) => {
                }
            } as UseCase;
        }
    }
    class UseCasePresenterStub extends UseCasePresenter{
        show(...data: unknown[]): void {
        }
        execute(){};
    }
    const domain_name = "domain_name";
    const use_case_name = "use_case_name";

    // @ts-ignore
    const use_case_presenter = new UseCasePresenterStub({});

    it('could be created', () => {
        const useCase = new UseCase(UseCaseFactoryStub, use_case_presenter, domain_name, use_case_name);
        expect(useCase).toBeInstanceOf(UseCase);
    });

    it ('calls presenter.execute if execute is called', () => {
        const useCase = new UseCase(UseCaseFactoryStub, use_case_presenter, domain_name, use_case_name);
        const spy = jest.spyOn(useCase.presenter, 'execute');
        useCase.execute();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(use_case_name);
    });

    it ('calls UseCaseFactory.create if forward is called', () => {
        const useCase = new UseCase(UseCaseFactoryStub, use_case_presenter, domain_name, use_case_name);
        // @ts-ignore
        const spy = jest.spyOn(useCase._UseCaseFactory, 'create');
        useCase.forward(use_case_name);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(use_case_name);
    });

});