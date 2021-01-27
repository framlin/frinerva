class BookingEntry:

    def __init__(self, amount, name, subject, date):
        self._amount = amount
        self._subject = subject
        self._date = date
        self._name = name

    def __str__(self):
        return 'BookingEntry(Amount:' + self._amount + ', Name:' + self._name + ', Sunbject:' + self._subject + ', Date:' + self._date + ')'
