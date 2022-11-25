import WebContents = Electron.WebContents;
import {DomainEntity} from "../domain/DomainEntity";
import {Observatory} from "../observation/Observatory";
import {Blueprint} from "../usecase/Blueprint";
import {UseCase} from "../usecase/UseCase";
import {UseCaseController} from "../usecase/UseCaseController";
import {UseCaseHelper} from "../usecase/UseCaseHelper";
import {UseCaseList} from "../usecase/UseCaseList";
import {UseCaseName} from "../usecase/UseCaseName";

export class UseCaseFactory {

    constructor(
        protected _domain_name: string,
        protected _DomainEntity: DomainEntity,
        protected _UseCases: UseCaseList,
        protected _IPCChannel: WebContents,
        protected _Observatory: Observatory
    ) {
    }

    create(use_case_name: UseCaseName) {
        if (this._UseCases[use_case_name]) {
            return this.create_use_case(this._UseCases[use_case_name], use_case_name);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }

    create_use_case(blueprint: Blueprint, use_case_name: UseCaseName): UseCase {
        const helper = blueprint.helper
            ? new blueprint.helper()
            : new UseCaseHelper();

        const presenter = new blueprint.presenter(this._IPCChannel);
        const interactor = new blueprint.interactor(this._DomainEntity, presenter, helper);

        const use_case = blueprint.usecase
            ? new blueprint.usecase(this, this._IPCChannel, use_case_name, this._domain_name)
            : new UseCase(this, this._IPCChannel, use_case_name, this._domain_name);

        blueprint.controller
            ? new blueprint.controller(interactor, use_case, this._Observatory)
            : new UseCaseController(interactor, use_case, this._Observatory);

        return use_case;
    }
}

export function create_use_case_factory(
    domain_name: string,
    domain_entity: DomainEntity,
    use_case_list: UseCaseList,
    ipc_channel: WebContents,
    observatory: Observatory
): UseCaseFactory {
    return new UseCaseFactory(domain_name, domain_entity, use_case_list, ipc_channel, observatory);
}
