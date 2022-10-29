import WebContents = Electron.WebContents;
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observatory} from "../../common/observation/Observatory";
import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCase} from "../../common/use_case/UseCase";
import {ControllerFactory} from "./ControllerFactory";
import {HelperFactory} from "./HelperFactory";
import {InteractorFactory} from "./InteractorFactory";
import {PresenterFactory} from "./PresenterFactory";
import {UseCaseList} from "./UseCaseList";

function create_use_case(blueprint: Blueprint) : UseCase {
    const helper = HelperFactory.create(blueprint.helper);
    const presenter = PresenterFactory.create(blueprint.presenter, UseCaseFactory.IPCChannel);
    const interactor = InteractorFactory.create(blueprint.interactor, UseCaseFactory.DomainEntity, presenter, helper);
    const use_case = new blueprint.usecase(UseCaseFactory, presenter);
    ControllerFactory.create(blueprint.controller, UseCaseFactory.Observatory, interactor, use_case);
    return use_case;
}


export class UseCaseFactory {
    static IPCChannel: WebContents;
    static DomainEntity: DomainEntity;
    static Observatory: Observatory;
    static UseCases: UseCaseList;

    static create(use_case_name: string) {
        if (this.UseCases[use_case_name]) {
            return create_use_case(this.UseCases[use_case_name]);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}
