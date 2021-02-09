from json import JSONEncoder
from hashlib import sha3_256
import json
import os
from decimal import Decimal, ROUND_HALF_UP

from accounting.booking_entry import BookingEntry, BookingEntryJSONEncoder


class Account:
    BOOKINGS_FILENAME = 'bookings.json'

    def __init__(self, cost_center: str):
        self._cost_center = cost_center
        self._bookings = dict()
        self._cents = Decimal('0.01')

    def __str__(self):
        result: str = self._cost_center + ':\n'
        result += str([booking for booking in self])
        return result

    def add_booking_entry(self, booking_entry: BookingEntry):
        hash_fun = sha3_256()
        hash_fun.update(bytes(str(booking_entry), encoding='utf-8'))
        self._bookings[hash_fun.hexdigest()] = booking_entry

    def get_bookings(self) -> dict:
        return self._bookings

    def get_cost_center(self) -> str:
        return self._cost_center

    def save(self, path: str):
        account_path = self._get_account_path(path)
        out_fn = self._get_account_filename(path)
        if not os.path.exists(account_path):
            os.mkdir(account_path)
        with open(out_fn, 'w') as outfile:
            json.dump(self._bookings, outfile, cls=BookingEntryJSONEncoder)

    def load(self, path: str):
        in_fn = self._get_account_filename(path)
        try:
            with open(in_fn, 'r') as infile:
                booking_entries = json.load(infile, cls=json.JSONDecoder)
                for hash_key in booking_entries:
                    booking_entry = BookingEntry.from_dict(booking_entries[hash_key])
                    self._bookings[hash_key] = booking_entry

        except json.JSONDecodeError:
            pass

    def _get_account_path(self, path):
        account_path = os.path.join(path, self._cost_center)
        return account_path

    def _get_account_filename(self, path) -> str:
        account_path = self._get_account_path(path)
        fn = os.path.join(account_path, Account.BOOKINGS_FILENAME)
        return fn

    def get_outgoing_payments(self) -> list:
        result = [booking for booking in self if booking.get_amount() < 0]
        return result

    def get_received_payments(self) -> list:
        result = [booking for booking in self if booking.get_amount() >= 0]
        return result

    def _sum(self, bookings):
        entries = [booking for booking in bookings]
        amounts = [entry.get_amount() for entry in entries]
        return Decimal(sum(amounts)).quantize(self._cents, ROUND_HALF_UP)

    def get_balance(self):
        return {"total": self._sum(self),
                "outgoing_payments": self._sum(self.get_outgoing_payments()),
                "received_payments": self._sum(self.get_received_payments())}

    def __iter__(self):
        return AccountIterator(self)


class AccountIterator:
    def __init__(self, account):
        self._bookings = account.get_bookings()
        self._keys = list(self._bookings.keys())
        self._index = 0

    def __next__(self):
        if self._index < len(self._keys):
            result = self._bookings[self._keys[self._index]]
            self._index += 1
            return result

        raise StopIteration


class AccountJSONEncoder(JSONEncoder):
    def default(self, account):
        result: dict = dict()
        result['_cost_center'] = account.get_cost_center()
        result["_bookings"] = [BookingEntryJSONEncoder().default(booking) for booking in account]
        return result
