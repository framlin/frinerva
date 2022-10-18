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

function create_use_case(use_case_name: string) {

    let helper = HelperFactory.create(use_case_name);
    let presenter = PresenterFactory.create(use_case_name, UseCaseFactory.IPCChannel);
    let interactor = InteractorFactory.create(use_case_name, UseCaseFactory.DomainEntity, presenter, helper);
    // @ts-ignore
    let use_case = new UseCases[use_case_name](UseCaseFactory, presenter);
    ControllerFactory.create(use_case_name, UseCaseFactory.Observatory, interactor, use_case);
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