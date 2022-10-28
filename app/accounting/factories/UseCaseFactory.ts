// noinspection JSPotentiallyInvalidConstructorUsage

import WebContents = Electron.WebContents;
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observatory} from "../../common/observation/Observatory";
import {InteractorFactory} from "./InteractorFactory";
import {PresenterFactory} from "./PresenterFactory";
import {ControllerFactory} from "./ControllerFactory";
import {HelperFactory} from "./HelperFactory";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCases} from './use_cases';
import {Blueprint} from "../../common/use_case/Blueprint";

function create_use_case(blueprint: Blueprint) : UseCase {
    const helper = HelperFactory.create(blueprint);
    const presenter = PresenterFactory.create(blueprint, UseCaseFactory.IPCChannel);
    const interactor = InteractorFactory.create(blueprint, UseCaseFactory.DomainEntity, presenter, helper);
    const use_case = new blueprint.usecase(UseCaseFactory, presenter);
    ControllerFactory.create(blueprint, UseCaseFactory.Observatory, interactor, use_case);
    return use_case;
}


class UseCaseFactory {
    static IPCChannel: WebContents;
    static DomainEntity: DomainEntity;
    static Observatory: Observatory;

    static create(use_case_name: string) {
        if (UseCases[use_case_name]) {
            return create_use_case(UseCases[use_case_name]);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}

module.exports = {UseCaseFactory};
export {UseCaseFactory}