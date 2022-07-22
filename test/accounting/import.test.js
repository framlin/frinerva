const BankingDataCVSReader  =  require("../../src/accounting/banking_data_csv_reader");
const Readable = require('stream').Readable

function create_one_line_stream() {
    return new Readable.from(
        "Datum;Wertstellung;Kategorie;Name;Verwendungszweck;Konto;Bank;Betrag;Währung\n" +
        "31.12.2020;31.12.2020;Stöttwang - Ausgang - Stw_Bank;Saldo der Abschlussposten QM - Support;04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste;;;-30,70;EUR\n");
}
test('reading empty file has empty data as result', ()=>{
    let s = new Readable.from("");
    let banking_data_cvs_reader = new BankingDataCVSReader();

    banking_data_cvs_reader.read_file(s).then(booking_entries => {
        expect(booking_entries.length).toBe(0);
    });
});

test('reading one data line with headers has one booking entry as result', () => {
    let s = create_one_line_stream();
    let banking_data_cvs_reader = new BankingDataCVSReader();

    banking_data_cvs_reader.read_file(s).then(booking_entries => {
        expect(booking_entries.length).toBe(1);
    });
});