import {UseCaseView} from "../ui/usecase/UseCaseView";
import {UseCaseList} from "../usecase/UseCaseList";
import {UseCaseName} from "../usecase/UseCaseName";

export class ViewFactory {
    constructor(private _UseCases: UseCaseList) {}

    create(use_case_name: UseCaseName) : UseCaseView{
        return new this._UseCases[use_case_name].view(use_case_name);
    }
}

export function create_view_factory(_UseCases: UseCaseList) {
    return new ViewFactory(_UseCases);
}
