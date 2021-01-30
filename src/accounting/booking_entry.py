from json import JSONEncoder


class BookingEntry:

    def __init__(self, amount: float, name: str, subject: str, date: str):
        self._amount = amount
        self._subject = subject
        self._date = date
        self._name = name

    def __str__(self):
        return 'BookingEntry(Amount:' + str(self._amount) + ', Name:' + self._name + ', Sunbject:' + self._subject + ', Date:' + self._date + ')'

    def get_amount(self) -> float:
        return self._amount


class BookingEntryJSONEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__
