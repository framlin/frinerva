import {UseCaseView} from "../../common/ui/use_case/UseCaseView";
import {UseCases} from './use_cases';
import {TUseCaseName} from "../account/TUseCaseName";

const view_cache: Record<string, UseCaseView> = {}

export class ViewFactory {
    static create(use_case_name: TUseCaseName) : UseCaseView{
        if (!(use_case_name in view_cache)) {
            // noinspection JSPotentiallyInvalidConstructorUsage
            view_cache[use_case_name] = new UseCases[use_case_name].view(use_case_name);
        }
        return view_cache[use_case_name]
    }
}
