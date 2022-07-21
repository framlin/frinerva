# from json import JSONEncoder
# import json
# import os
# from utils import utils
from accounting.booking_entry import BookingEntry


class Account:
    BOOKINGS_FILENAME = 'bookings.json'

    def __init__(self, cost_center: str):
        self._cost_center = cost_center
        self._bookings = []

    def add_booking_entries(self, booking_entries: list):
        for entry in booking_entries:
            self._bookings.append(entry)

    def get_bookings(self) -> list:
        return self._bookings

    def get_cost_center(self) -> str:
        return self._cost_center

#     def __str__(self):
#         result: str = self._cost_center + ':\n'
#         result += str([booking for booking in self])
#         return result
#
#
#
#
#     def get_booking_entry_by_booking_code(self, booking_code: str) -> list:
#         result = []
#         for be in self:
#             if be.get_booking_code() == booking_code:
#                 result.append(be)
#         return result
#
#     def remove(self, entry):
#         self._bookings.remove(entry)
#
#     def _write(self, path: str, json_encoder):
#         account_path = self._get_account_path(path)
#         out_fn = self._get_account_filename(path)
#         if not os.path.exists(account_path):
#             os.mkdir(account_path)
#         with open(out_fn, 'w') as outfile:
#             json.dump(self._bookings, outfile, cls=json_encoder)
#
#     def save(self, path: str):
#         self._write(path, BookingEntryJSONEncoder)
#
#     def load(self, path: str):
#         in_fn = self._get_account_filename(path)
#         try:
#             with open(in_fn, 'r') as infile:
#                 booking_entries = json.load(infile, cls=json.JSONDecoder)
#                 self._bookings = [BookingEntry.from_dict(booking_entry) for booking_entry in booking_entries]
#
#         except json.JSONDecodeError:
#             pass
#
#     def _get_account_path(self, path):
#         account_path = os.path.join(path, self._cost_center)
#         return account_path
#
#     def _get_account_filename(self, path) -> str:
#         account_path = self._get_account_path(path)
#         fn = os.path.join(account_path, Account.BOOKINGS_FILENAME)
#         return fn
#
#     def get_outgoing_payments(self) -> list:
#         result = [booking for booking in self if booking.get_amount() < 0]
#         return result
#
#     def get_received_payments(self) -> list:
#         result = [booking for booking in self if booking.get_amount() >= 0]
#         return result
#
#     def get_balance(self):
#         return {"total": _sum(self),
#                 "outgoing_payments": _sum(self.get_outgoing_payments()),
#                 "received_payments": _sum(self.get_received_payments())}
#
#     def __iter__(self):
#         return AccountIterator(self)
#
#
# class AccountIterator:
#     def __init__(self, account):
#         self._bookings = account.get_bookings()
#         self._index = 0
#
#     def __next__(self):
#         if self._index < len(self._bookings):
#             result = self._bookings[self._index]
#             self._index += 1
#             return result
#
#         raise StopIteration
#
#
# class AccountJSONEncoder(JSONEncoder):
#     def default(self, account):
#         result: dict = dict()
#         result['_cost_center'] = account.get_cost_center()
#         result["_bookings"] = [BookingEntryJSONEncoder().default(booking) for booking in account]
#         return result
#
#
# def _sum(bookings):
#     entries = [booking for booking in bookings]
#     amounts = [entry.get_amount() for entry in entries]
#     return utils.round_money(sum(amounts))
