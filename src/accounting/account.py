from json import JSONEncoder
from hashlib import sha3_256
import json
import os

from accounting.booking_entry import BookingEntry, BookingEntryJSONEncoder


class Account:
    BOOKINGS_FILENAME = 'bookings.json'

    def __init__(self, cost_center: str):
        self._cost_center = cost_center
        self._booking_entries = dict()

    def __str__(self):
        result: str = self._cost_center + ':\n'
        result += str([be for be in self._booking_entries.values()])
        return result

    def add_booking_entry(self, booking_entry: BookingEntry):
        hash_fun = sha3_256()
        hash_fun.update(bytes(str(booking_entry), encoding='utf-8'))
        self._booking_entries[hash_fun.hexdigest()] = booking_entry

    def get_bookings(self) -> dict:
        return self._booking_entries

    def get_cost_center(self) -> str:
        return self._cost_center

    def save(self, path: str):
        account_path = self._get_account_path(path)
        out_fn = self._get_account_filename(path)
        if not os.path.exists(account_path):
            os.mkdir(account_path)
        with open(out_fn, 'w') as outfile:
            json.dump(self._booking_entries, outfile, cls=BookingEntryJSONEncoder)

    def load(self, path: str):
        in_fn = self._get_account_filename(path)
        try:
            with open(in_fn, 'r') as infile:
                booking_entries = json.load(infile, cls=json.JSONDecoder)
                for hash_key in booking_entries:
                    booking_entry = BookingEntry.from_dict(booking_entries[hash_key])
                    self._booking_entries[hash_key] = booking_entry

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
        result = [be for be in self._booking_entries.values() if be.get_amount() < 0]
        return result

    def get_received_payments(self) -> list:
        result = [be for be in self._booking_entries.values() if be.get_amount() >= 0]
        return result

    def get_balance(self):
        entries = [be for be in self._booking_entries.values()]
        amounts = [entry.get_amount() for entry in entries]
        return sum(amounts)


class AccountJSONEncoder(JSONEncoder):
    def default(self, o):
        result = dict()
        result['_cost_center'] = o.get_cost_center()
        result["_booking_entries"] = [BookingEntryJSONEncoder().default(op)
                                      for op in o.get_bookings().values()]
        return result
