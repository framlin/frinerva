const BookingEntry = require("../account_management/booking_entry");
const PaymentToBookingEntryConverter = require("./payment_to_booking_entry_converter");

// const cost_center_mapping = {
//     'HausKosten': 'HOUSE',
//     'VerwaltungsKosten': 'ADMINISTRATION',
//     'Nebenkosten_Vorauszahlungen': 'SERVICE_CHARGES',
//     'WohnungsKosten': 'DWELLING',
//     'Stw_Bank': 'BANKING',
//     'Stw_Priv_Ausgaben': 'PRIVATE',
//     'Nachlass': 'ESTATE',
//     'Kaution': 'DEPOSITE',
//     'Miete': 'RENT',
//     'NebenKosten': 'SERVICE_CHARGES'
// };

// _extract_cost_center_part(category) {
//     let category_str = this._strip_whitespaces(category);
//     let categories = category_str.split('-');
//     return categories[categories.length-1];
// }


class MoneyMoneyToBookingEntryConverter extends PaymentToBookingEntryConverter {
    convert(payment_entry) {
        return new BookingEntry (
            this.__convert_to_date(payment_entry.Datum),
            payment_entry.Verwendungszweck,
            payment_entry.Name,
            this._convert_to_amount(payment_entry.Betrag).toFixed(2),
            "BC??"
            );
    }

    __convert_to_date(date_str) {
        let [day, month, year] = date_str.split(".");
        return new Date(year, month -1, day);
    }

    _convert_to_amount(amount_string){
        return parseFloat(this._strip_whitespaces(amount_string).replace(",", "."));
    }

    _strip_whitespaces(str) {
        return str.replace(/\s/g, "");
    }

}

module.exports = MoneyMoneyToBookingEntryConverter;