import {UseCaseHelper} from "../../../common/use_case/UseCaseHelper";
import * as Fs from 'fs';
import {MoneyMoneyCSVReader} from "./util/MoneyMoneyCSVReader";

class ReadCSVFileHelper extends UseCaseHelper{


    load_file(file_name: string) {
        if (file_name) {
            return Fs.createReadStream(file_name, 'utf8');
        } else {
            return new Error("FILENAME MISSING");
        }
    }

    async create_payments(file: any) : Promise<any>{
        return await MoneyMoneyCSVReader.create_payments(file);
    }

}

export {ReadCSVFileHelper}