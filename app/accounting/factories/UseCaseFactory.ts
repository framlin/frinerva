import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseInteractor} from "../../common/use_case/UseCaseInteractor";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import WebContents = Electron.WebContents;
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observatory} from "../../common/observation/Observatory"
import {InteractorFactory} from "./InteractorFactory";
import {PresenterFactory} from "./PresenterFactory";
import {ControllerFactory} from "./ControllerFactory";
import {HelperFactory} from "./HelperFactory";

import {UseCases} from './use_cases';

function wire_use_case(use_case: UseCase, interactor: UseCaseInteractor,
                       presenter: UseCasePresenter, controller: UseCaseController,
                       helper: UseCaseHelper) {
    //order MATTERS
    use_case.presenter = presenter;
    interactor.response_boundary = presenter;
    interactor.helper = helper;
    controller.request_boundary = interactor;
    controller.use_case = use_case;
}

function create_use_case(use_case_name: string) {
    // @ts-ignore
    let use_case = new UseCases[use_case_name](UseCaseFactory, use_case_name);
    let interactor = InteractorFactory.create(use_case_name, UseCaseFactory.DomainEntity);
    let presenter = PresenterFactory.create(use_case_name, UseCaseFactory.IPCChannel);
    let controller = ControllerFactory.create(use_case_name, UseCaseFactory.Observatory);
    let helper = HelperFactory.create(use_case_name);
    wire_use_case(use_case, interactor, presenter, controller, helper);
    return use_case;
}



class UseCaseFactory {
    static IPCChannel: WebContents;
    static DomainEntity: DomainEntity;
    static Observatory: Observatory;

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