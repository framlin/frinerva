import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {JSONStorage} from "../../common/persistence/json/JSONStorage";
import {AccountingHelper}  from "../../common/persistence/helper/AccountingHelper";
import * as path from 'path';

const STORAGE_ROOT_DIR = path.join(__dirname,"../../common/persistence/data") ;

class ShowListHelper extends UseCaseHelper{


    async load_cost_center_configuration() {
        return await AccountingHelper.load_cost_center_configuration();
    }

}

module.exports = {ShowListHelper};
export {ShowListHelper}