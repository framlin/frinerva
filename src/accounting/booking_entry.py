from json import JSONEncoder
from hashlib import sha3_256


class BookingEntry:

    def __init__(self, amount: float, name: str, subject: str, date: str, booking_code: str):
        self._amount = amount
        self._subject = subject
        self._date = date
        self._name = name
        self._booking_code = booking_code
        self._id = ''

        hash_fun = sha3_256()
        hash_fun.update(bytes(str(self), encoding='utf-8'))
        self._id = hash_fun.hexdigest()

    def __str__(self):
        return 'BookingEntry(Amount:' + str(self._amount) + \
               ', Name:' + self._name + \
               ', Subject:' + self._subject + \
               ', Date:' + self._date + \
               ', BookingCode:' + self._booking_code + \
               ', ID:' + self._id

    def get_amount(self) -> float:
        return self._amount

    def get_id(self) -> str:
        return self._id

    def __iter__(self):
        for attr, value in self.__dict__.items():
            yield attr, value

    @classmethod
    def from_dict(cls, the_dict: dict):
        return cls(
            amount=the_dict['_amount'],
            name=the_dict['_name'],
            subject=the_dict['_subject'],
            date=the_dict['_date'],
            booking_code=the_dict['_booking_code']
        )


# noinspection PyProtectedMember
class BookingEntryJSONEncoder(JSONEncoder):
    def default(self, o):
        return dict(o)

