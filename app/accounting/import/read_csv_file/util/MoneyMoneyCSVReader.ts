import CsvReadableStream from 'csv-reader';

export class MoneyMoneyCSVReader {
    static create_payments(file_stream: any) {
        return new Promise(resolve => {
            let payment_entries: any[] = [];
            file_stream.pipe(new CsvReadableStream({
                delimiter: ";",
                parseNumbers: true,
                parseBooleans: true,
                trim: true,
                skipHeader: true,
                asObject: true
            })).on('data', (row: any) => {
                payment_entries.push(row);
            }).on('end', () => resolve(payment_entries));
        });
    }
}
