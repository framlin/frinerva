from hashlib import sha3_256
import json
import os

from accounting.booking_entry import BookingEntry, BookingEntryJSONEncoder


class Account:

    def __init__(self, cost_center: str):
        self._cost_center = cost_center
        self._received_payments = dict()
        self. _outgoing_payments = dict()

    def __str__(self):
        result = self._cost_center + ':\n'
        for be in self._received_payments.values():
            result += str(be) + '\n'
        for be in self._outgoing_payments.values():
            result += str(be) + '\n'
        return result

    def add_booking_entry(self, booking_entry: BookingEntry):
        hash_fun = sha3_256()
        hash_fun.update(bytes(str(booking_entry), encoding='utf-8'))
        amount = booking_entry.get_amount()
        if amount < 0.0:
            self._outgoing_payments[hash_fun.hexdigest()] = booking_entry
        else:
            self._received_payments[hash_fun.hexdigest()] = booking_entry

    def get_cost_center(self) -> str:
        return self._cost_center

    def save(self, path: str):
        account_path = self._get_account_path(path)
        in_fn, out_fn = self._get_account_filenames(path)
        if not os.path.exists(account_path):
            os.mkdir(account_path)
        with open(in_fn, 'w') as outfile:
            json.dump(self._received_payments, outfile, cls=BookingEntryJSONEncoder)

        with open(out_fn, 'w') as outfile:
            json.dump(self._outgoing_payments, outfile, cls=BookingEntryJSONEncoder)

    def load(self, path: str):
        in_fn, out_fn = self._get_account_filenames(path)
        try:
            with open(in_fn, 'r') as infile:
                self._received_payments = json.load(infile, cls=json.JSONDecoder)
        except json.JSONDecodeError:
            pass

        try:
            with open(out_fn, 'r') as infile:
                self._outgoing_payments = json.load(infile, cls=json.JSONDecoder)
        except json.JSONDecodeError:
            pass

    def _get_account_path(self, path):
        account_path = os.path.join(path, self._cost_center)
        return account_path

    def _get_account_filenames(self, path) -> (str, str):
        account_path = self._get_account_path(path)
        in_fn = os.path.join(account_path, 'incoming.json')
        out_fn = os.path.join(account_path, 'outgoing.json')
        return in_fn, out_fn
