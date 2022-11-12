import WebContents = Electron.WebContents;
import {DomainEntity} from "../domain/DomainEntity";
import {IPCChannel} from "../ipc/IPCChannel";
import {Observatory} from "../observation/Observatory";
import {Blueprint} from "../usecase/Blueprint";
import {UseCase} from "../usecase/UseCase";
import {UseCaseList} from "../usecase/UseCaseList";
import {UseCaseName} from "../usecase/UseCaseName";

// function create_use_case(blueprint: Blueprint, use_case_name: UseCaseName) : UseCase {
//     const helper = new blueprint.helper();
//     const presenter = new blueprint.presenter(UseCaseFactory.IPCChannel);
//     const interactor = new blueprint.interactor(UseCaseFactory.DomainEntity, presenter, helper);
//     const use_case = new blueprint.usecase(UseCaseFactory, presenter, use_case_name);
//     new blueprint.controller(interactor, use_case, UseCaseFactory.Observatory);
//     return use_case;
// }


export class UseCaseFactory {

    constructor(
        protected _DomainEntity: DomainEntity,
        protected _UseCases: UseCaseList,
        protected _IPCChannel: WebContents,
        protected _Observatory: Observatory
    ) {
    }


    // static IPCChannel: WebContents;
    // static DomainEntity: DomainEntity;
    // static Observatory: Observatory;
    // static UseCases: UseCaseList;

    create(use_case_name: UseCaseName) {
        if (this._UseCases[use_case_name]) {
            return this.create_use_case(this._UseCases[use_case_name], use_case_name);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }

    create_use_case(blueprint: Blueprint, use_case_name: UseCaseName): UseCase {
        const helper = new blueprint.helper();
        const presenter = new blueprint.presenter(this._IPCChannel);
        const interactor = new blueprint.interactor(this._DomainEntity, presenter, helper);
        const use_case = new blueprint.usecase(this, presenter, use_case_name);
        new blueprint.controller(interactor, use_case, this._Observatory);
        return use_case;
    }
}

export function create_use_case_factory(
    domain_entity: DomainEntity,
    use_case_list: UseCaseList,
    ipc_channel: WebContents,
    observatory: Observatory
) : UseCaseFactory  {
    return new UseCaseFactory(domain_entity, use_case_list, ipc_channel, observatory);
}
