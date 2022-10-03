"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyMoneyCSVReader = void 0;
const csv_reader_1 = __importDefault(require("csv-reader"));
class MoneyMoneyCSVReader {
    static create_payments(file_stream) {
        return new Promise(resolve => {
            let payment_entries = [];
            file_stream.pipe(new csv_reader_1.default({
                delimiter: ";",
                parseNumbers: true,
                parseBooleans: true,
                trim: true,
                skipHeader: true,
                asObject: true
            })).on('data', (row) => {
                payment_entries.push(row);
            }).on('end', () => resolve(payment_entries));
        });
    }
}
exports.MoneyMoneyCSVReader = MoneyMoneyCSVReader;
module.exports = { MoneyMoneyCSVReader };
//# sourceMappingURL=MoneyMoneyCSVReader.js.map