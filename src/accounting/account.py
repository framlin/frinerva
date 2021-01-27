from hashlib import sha3_256

from accounting.booking_entry import BookingEntry


class Account:

    def __init__(self, cost_center: str):
        self._cost_center = cost_center
        self. _booking_entries = dict()

    def __str__(self):
        result = self._cost_center + ':\n'
        for be in self._booking_entries.values():
            result += str(be) + '\n'
        return result

    def add_booking_entry(self, booking_entry: BookingEntry):
        hash_fun = sha3_256()
        hash_fun.update(bytes(str(booking_entry), encoding='utf-8'))

        self._booking_entries[hash_fun.hexdigest()] = booking_entry

    def get_cost_center(self) -> str:
        return self._cost_center
