import {DomainEntity} from "../../../common/domain/DomainEntity";
import {DomainHelper} from "../../../common/domain/DomainHelper";
import {Observatory} from "../../../common/observation/Observatory";
import {UseCaseView} from "../../../common/ui/use_case/UseCaseView";
import {UseCase} from "../../../common/use_case/UseCase";
import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {UseCaseHelper} from "../../../common/use_case/UseCaseHelper";
import {UseCaseInteractor} from "../../../common/use_case/UseCaseInteractor";
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {UseCaseFactory} from "../UseCaseFactory";
import {TUseCaseList} from "../../../common/use_case/TUseCaseList";
import {UseCases as AccountingUseCases} from "../../use_cases";

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


const test_use_cases: TUseCaseList = AccountingUseCases;
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