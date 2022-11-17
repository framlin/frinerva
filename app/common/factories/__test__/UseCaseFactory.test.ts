import {DomainEntity} from "../../domain/DomainEntity";
import {DomainHelper} from "../../domain/DomainHelper";
import {Observatory} from "../../observation/Observatory";
import {UseCaseView} from "../../ui/usecase/UseCaseView";
import {UseCase} from "../../usecase/UseCase";
import {UseCaseController} from "../../usecase/UseCaseController";
import {UseCaseHelper} from "../../usecase/UseCaseHelper";
import {UseCaseInteractor} from "../../usecase/UseCaseInteractor";
import {UseCasePresenter} from "../../usecase/UseCasePresenter";
import {UseCaseFactory} from "../UseCaseFactory";
import {UseCaseList} from "../../usecase/UseCaseList";
import {UseCases as AccountingUseCases} from "../../../accounting/usecases";

class IPCChannelMock {
}

class DomainEntityMock extends DomainEntity {
    constructor() {
        super(DomainHelper);
    }

    provide_at(observatory: Observatory): void {
    }
}

class ObservatoryMock extends Observatory {
}

class UseCaseMock extends UseCase {
}

class ControllerMock extends UseCaseController {
    protected register_request_channel_receiver() {

    }
}

class PresenterMock extends UseCasePresenter {
    show(...data: unknown[]): void {
    }
}

class InteractorMock extends UseCaseInteractor {
    execute(...data: any[]): any {
    }
}

class ViewMock extends UseCaseView {
}

class HelperMock extends UseCaseHelper {
}


const test_use_cases: UseCaseList = AccountingUseCases;
test_use_cases["show_list"] = {
    usecase: UseCaseMock,
    controller: ControllerMock,
    interactor: InteractorMock,
    presenter: PresenterMock,
    helper: HelperMock,
    view: ViewMock
}

// @ts-ignore
UseCaseFactory.IPCChannel = new IPCChannelMock;
UseCaseFactory.DomainEntity = new DomainEntityMock;
UseCaseFactory.Observatory = new ObservatoryMock;
UseCaseFactory.UseCases = test_use_cases;


test('create show_list use case', () => {
    const use_case = UseCaseFactory.create('show_list');
    expect(use_case).toBeInstanceOf(UseCaseMock);
    expect(use_case.presenter).toBeInstanceOf(PresenterMock);
});