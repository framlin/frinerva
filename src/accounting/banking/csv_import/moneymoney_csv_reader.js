const PaymentCSVReader = require("./payment_csv_reader");

const CsvReadableStream = require('csv-reader');

class MoneyMoneyCSVReader extends PaymentCSVReader {

     static create_payments(file_stream) {
        return new Promise(resolve => {
            let payment_entries = [];
            file_stream.pipe(new CsvReadableStream({
                delimiter: ";",
                parseNumbers: true,
                parseBooleans: true,
                trim: true,
                skipHeader: true,
                asObject: true
            })).on('data', row => {
                payment_entries.push(row);
            }).on('end', () => resolve(payment_entries));
        });
    }
}

module.exports = MoneyMoneyCSVReader;