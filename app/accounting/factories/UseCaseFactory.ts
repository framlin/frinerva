import WebContents = Electron.WebContents;
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observatory} from "../../common/observation/Observatory";
import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseList} from "../../common/use_case/UseCaseList";
import {UseCaseName} from "../../common/use_case/UseCaseName";

function create_use_case(blueprint: Blueprint, use_case_name: UseCaseName) : UseCase {
    const helper = new blueprint.helper();
    const presenter = new blueprint.presenter(UseCaseFactory.IPCChannel);
    const interactor = new blueprint.interactor(UseCaseFactory.DomainEntity, presenter, helper);
    const use_case = new blueprint.usecase(UseCaseFactory, presenter, use_case_name);
    new blueprint.controller(interactor, use_case, UseCaseFactory.Observatory);
    return use_case;
}


export class UseCaseFactory {
    static IPCChannel: WebContents;
    static DomainEntity: DomainEntity;
    static Observatory: Observatory;
    static UseCases:UseCaseList;

    static create(use_case_name: UseCaseName) {
        if (this.UseCases[use_case_name]) {
            return create_use_case(this.UseCases[use_case_name], use_case_name);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}
