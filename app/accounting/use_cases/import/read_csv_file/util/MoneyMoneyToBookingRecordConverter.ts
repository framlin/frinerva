import {Accounting} from "../../../../entites/Accounting";
import {BookingRecordData} from "../../../../entites/BookingRecord";
import {MoneyMoneyPayment} from "../../../../entites/Payment";

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

export class MoneyMoneyToBookingRecordConverter {
    convert(payment_entry: MoneyMoneyPayment): BookingRecordData {
        const booking_entry = Accounting.create_booking_entry(
            this._convert_to_date(payment_entry.Datum),
            payment_entry.Verwendungszweck,
            payment_entry.Name,
            this._convert_to_amount(payment_entry.Betrag),
            "BC??"
        );
        const booking_entry_data = booking_entry.data;
        const booking_period = booking_entry.date.getFullYear().toString();
        const cost_center = this._convert_category_to_cost_center(payment_entry.Kategorie);
        return {booking_entry: booking_entry_data, cost_center, booking_period};
    }

    _convert_to_date(date_str: string) {
        const [day, month, year] = date_str.split(".");
        return new Date(+year, +month - 1, +day);
    }

    _convert_to_amount(amount_value: string|number) {
        if (typeof amount_value !== "string") {
            return amount_value;
        } else {
            return parseFloat(this._strip_whitespaces(amount_value).replace(",", "."));
        }
    }

    _strip_whitespaces(str: string) {
        return str.replace(/\s/g, "");
    }

    _extract_cost_center_key(category: string) {
        const elems = category.split('-');
        const cost_center_key = elems[elems.length - 1]
        return this._strip_whitespaces(cost_center_key);
    }

    _convert_category_to_cost_center(category: string) {
        const cost_center_key = this._extract_cost_center_key(category);
        const cost_center = COST_CENTER_MAP.get(cost_center_key);
        return cost_center || "";
    }
}