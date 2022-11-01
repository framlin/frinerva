import WebContents = Electron.WebContents;
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observatory} from "../../common/observation/Observatory";
import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCase} from "../../common/use_case/UseCase";
import {TUseCaseList} from "./TUseCaseList";

function create_use_case(blueprint: Blueprint) : UseCase {
    const helper = new blueprint.helper();
    const presenter = new blueprint.presenter(UseCaseFactory.IPCChannel);
    const interactor = new blueprint.interactor(UseCaseFactory.DomainEntity, presenter, helper);
    const use_case = new blueprint.usecase(UseCaseFactory, presenter);
    new blueprint.controller(interactor, use_case, UseCaseFactory.Observatory);
    return use_case;
}


export class UseCaseFactory {
    static IPCChannel: WebContents;
    static DomainEntity: DomainEntity;
    static Observatory: Observatory;
    static UseCases: TUseCaseList;

    static create(use_case_name: string) {
        if (this.UseCases[use_case_name]) {
            return create_use_case(this.UseCases[use_case_name]);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}
