import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import WebContents = Electron.WebContents;
import {InteractorFactory} from "./InteractorFactory";
import {PresenterFactory} from "./PresenterFactory";
import {ControllerFactory} from "./ControllerFactory";
import {HelperFactory} from "./HelperFactory";

import {UseCases} from './use_cases'

function create_interactor(use_case: UseCase, use_case_name: string) {
    let interactor = UseCaseFactory.InteractorFactory.create(use_case_name);
    use_case.interactor = interactor;
    return interactor;
}

function create_presenter(use_case: UseCase, use_case_name: string) {
    let presenter = UseCaseFactory.PresenterFactory.create(use_case_name, UseCaseFactory.IPCChannel);
    use_case.presenter = presenter;
    return presenter;
}

function create_controller(use_case: UseCase, use_case_name: string) {
    let controller = UseCaseFactory.ControllerFactory.create(use_case_name);
    use_case.controller = controller;
    return controller;
}

function create_helper(use_case: UseCase, use_case_name: string) {
    let helper = UseCaseFactory.HelperFactory.create(use_case_name);
    use_case.helper = helper;
    return helper;
}

function wire_use_case(use_case: UseCase, interactor: UseCaseInteractor,
                       presenter: UseCasePresenter, controller: UseCaseController,
                       helper: UseCaseHelper) {
    //order MATTERS
    interactor.presenter = presenter;
    interactor.helper = helper;
    controller.interactor = interactor;
    controller.use_case = use_case;
    presenter.controller = controller;
}

function create_use_case(use_case_name: string) {
    // @ts-ignore
    let use_case = new UseCases[use_case_name](UseCaseFactory, use_case_name);
    let interactor = create_interactor(use_case, use_case_name);
    let presenter = create_presenter(use_case, use_case_name);
    let controller = create_controller(use_case, use_case_name);
    let helper = create_helper(use_case, use_case_name);
    wire_use_case(use_case, interactor, presenter, controller, helper);
    return use_case;
}



class UseCaseFactory {
    static PresenterFactory: typeof PresenterFactory;
    static InteractorFactory: typeof InteractorFactory;
    static ControllerFactory: typeof ControllerFactory;
    static HelperFactory: typeof HelperFactory;
    static IPCChannel: WebContents;

    static config(_PresenterFactory: typeof PresenterFactory,
                  _InteractorFactory: typeof InteractorFactory,
                  _ControllerFactory: typeof ControllerFactory,
                  _HelperFactory: typeof HelperFactory,
                  _IPCChannel: WebContents) {
        this.PresenterFactory = _PresenterFactory;
        this.InteractorFactory = _InteractorFactory;
        this.ControllerFactory = _ControllerFactory;
        this.HelperFactory = _HelperFactory;
        this.IPCChannel = _IPCChannel;
    }


    static create(use_case_name: string) {
        if (UseCases[use_case_name]) {
            return create_use_case(use_case_name);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}

module.exports = {UseCaseFactory};
export {UseCaseFactory}