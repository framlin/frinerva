import {Views} from './views';
import {UseCaseView} from "../../common/ui/use_case/UseCaseView";

let view_cache = {}

class ViewFactory {
    static create(use_case_name: string) : UseCaseView{
        if (!(use_case_name in view_cache)) {
            // @ts-ignore
            view_cache[use_case_name] = new Views[use_case_name](use_case_name);
        }
        // @ts-ignore
        return view_cache[use_case_name]
    }
}

module.exports = {ViewFactory};
export {ViewFactory}