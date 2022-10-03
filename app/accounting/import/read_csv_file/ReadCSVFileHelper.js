const {UseCaseHelper} = require("../../../common/use_case/UseCaseHelper");
const Fs = require("fs");
const MoneyMoneyCSVReader = require("./util/MoneyMoneyCSVReader");

class ReadCSVFileHelper extends UseCaseHelper{


    load_file(file_name) {
        if (file_name) {
            return Fs.createReadStream(file_name, 'utf8');
        } else {
            return new Error("FILENAME MISSING");
        }
    }

    async create_payments(file) {
        return await MoneyMoneyCSVReader.create_payments(file);
    }

}

module.exports = ReadCSVFileHelper;