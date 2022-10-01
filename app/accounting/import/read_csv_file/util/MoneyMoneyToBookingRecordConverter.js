const Accounting = require("../../../account/Accounting");

const COST_CENTER_MAP = new Map(Object.entries({
    'HausKosten': 'HOUSE',
    'VerwaltungsKosten': 'ADMINISTRATION',
    'Nebenkosten_Vorauszahlungen': 'SERVICE_CHARGES',
    'WohnungsKosten': 'DWELLING',
    'Stw_Bank': 'BANKING',
    'Stw_Priv_Ausgaben': 'PRIVATE',
    'Nachlass': 'ESTATE',
    'Kaution': 'DEPOSIT',
    'Miete': 'RENT',
    'NebenKosten': 'SERVICE_CHARGES'
}));

class MoneyMoneyToBookingRecordConverter {
    convert(payment_entry) {
        let booking_entry = Accounting.create_booking_entry(
            this._convert_to_date(payment_entry.Datum),
            payment_entry.Verwendungszweck,
            payment_entry.Name,
            this._convert_to_amount(payment_entry.Betrag),
            "BC??"
        );

        let year = booking_entry.date.getFullYear();
        let cost_center = this._convert_category_to_cost_center(payment_entry.Kategorie);
        return {booking_entry, cost_center, year};
    }

    _convert_to_date(date_str) {
        let [day, month, year] = date_str.split(".");
        return new Date(year, month - 1, day);
    }

    _convert_to_amount(amount_string) {
        if (typeof amount_string !== "string") {
            return amount_string;
        } else {
            return parseFloat(this._strip_whitespaces(amount_string).replace(",", "."));
        }
    }

    _strip_whitespaces(str) {
        return str.replace(/\s/g, "");
    }

    _extract_cost_center_key(category) {
        let elems = category.split('-');
        let cost_center_key = elems[elems.length - 1]
        return this._strip_whitespaces(cost_center_key);
    }

    _convert_category_to_cost_center(category) {
        let cost_center_key = this._extract_cost_center_key(category);
        return COST_CENTER_MAP.get(cost_center_key);
    }


}

module.exports = MoneyMoneyToBookingRecordConverter;