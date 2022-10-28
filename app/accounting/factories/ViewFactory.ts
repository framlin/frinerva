import {UseCases} from './use_cases';
import {UseCaseView} from "../../common/ui/use_case/UseCaseView";

const view_cache: Record<string, UseCaseView> = {}

export class ViewFactory {
    static create(use_case_name: string) : UseCaseView{
        if (!(use_case_name in view_cache)) {
            // noinspection JSPotentiallyInvalidConstructorUsage
            view_cache[use_case_name] = new UseCases[use_case_name].view(use_case_name);
        }
        return view_cache[use_case_name]
    }
}
