from accounting.account import Account
import json

from management.service_carges.service_charge_booking_entry import ServiceChargeBookingEntryJSONEncoder, \
    ServiceChargeBookingEntry


class ServiceChargeAccount(Account):

    def save(self, path: str):
        self._write(path, ServiceChargeBookingEntryJSONEncoder)

    def load(self, path: str):
        in_fn = self._get_account_filename(path)
        try:
            with open(in_fn, 'r') as infile:
                booking_entries = json.load(infile, cls=json.JSONDecoder)
                self._bookings = \
                    [ServiceChargeBookingEntry.from_dict(booking_entry) for booking_entry in booking_entries]

        except json.JSONDecodeError:
            pass
