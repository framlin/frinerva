from hashlib import sha3_256
from json import JSONEncoder

from accounting.booking_entry import BookingEntry


class ServiceChargeBookingEntry(BookingEntry):
    ADVANCE_PAYMENT_BOOKING_CODES = ['SC15', 'HC01']

    def __init__(self, amount: float, name: str, subject: str, date: str, booking_code: str, end_date: str,
                 portion: float, billable: bool):
        super().__init__(amount, name, subject, date, booking_code)
        self._id = ''
        self._end_date = end_date
        self._portion = portion
        self._billable = billable

        hash_fun = sha3_256()
        hash_fun.update(bytes(str(self), encoding='utf-8'))
        self._id = hash_fun.hexdigest()

    def __str__(self):
        return 'ServiceChargeBookingEntry(Amount:' + str(self._amount) + \
               ', Name:' + self._name + \
               ', Subject:' + self._subject + \
               ', Date:' + self._date + \
               ', BookingCode:' + self._booking_code + \
               ', EndDate:' + self._end_date + \
               ', Portion: ' + str(self._portion) + \
               ', Billable: ' + str(self._billable) + \
               ', ID:' + self._id

    def get_portion(self):
        return self._portion

    def is_billable(self):
        return self._billable

    @classmethod
    def from_dict(cls, the_dict: dict):
        return cls(
            amount=float(the_dict['_amount']),
            name=the_dict['_name'],
            subject=the_dict['_subject'],
            date=the_dict['_date'],
            booking_code=the_dict['_booking_code'],
            end_date=the_dict['_end_date'],
            portion=float(the_dict['_portion']),
            billable=the_dict['_billable']
        )

    def update_from_dict(self, entry_dict: dict):
        super().update_from_dict(entry_dict)
        self._end_date = entry_dict['_end_date']
        self._portion = float(entry_dict['_portion'])
        self._billable = entry_dict['_billable']

    def has_advance_payment_booking_code(self):
        return self._booking_code in ServiceChargeBookingEntry.ADVANCE_PAYMENT_BOOKING_CODES

# noinspection PyProtectedMember
class ServiceChargeBookingEntryJSONEncoder(JSONEncoder):
    def default(self, o):
        return {
            '_amount': o._amount,
            '_subject': o._subject,
            '_date': o._date,
            '_name': o._name,
            '_booking_code': o._booking_code,
            '_end_date': o._end_date,
            '_portion': o._portion,
            '_billable': o._billable,
            '_id': o._id
        }
