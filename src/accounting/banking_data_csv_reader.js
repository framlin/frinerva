const CsvReadableStream = require('csv-reader');

class BankingDataCVSReader {

    read_file(file_stream) {
        return new Promise(resolve => {
            let booking_entries = [];
            file_stream.pipe(new CsvReadableStream({
                delimiter: ";",
                parseNumbers: true,
                parseBooleans: true,
                trim: true,
                skipHeader: true,
                asObject: true
            })).on('data', row => {
                booking_entries.push(row);
            }).on('end', () => resolve(booking_entries));
        });
    }

}

module.exports = BankingDataCVSReader;