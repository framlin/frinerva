from _oldaccounting.account import Account
from config import FILE_CONFIG
from management.service_carges.service_charge_balance import ServiceChargeBalance
from management.service_carges.service_charge_booking_entry import ServiceChargeBookingEntry
from management.service_carges.service_charge_statement import ServiceChargeStatement
from management.service_carges.service_charge_types import SERVICE_CHARGE_TYPES


def import_scs_blueprint(year):
    scs = ServiceChargeStatement()
    scs.load_blueprint()
    for scs_type in SERVICE_CHARGE_TYPES:
        scs_balance = ServiceChargeBalance(scs_type, year)
        scs_bp = scs.get_blueprint(scs_type)
        scs_bp['scs']['_booking_period'] = str(year)
        for acc_bp in scs_bp['scs']['_accounts']:
            scs_account = Account(acc_bp['_cost_center'])
            for booking_bp in acc_bp['_bookings']:
                scs_booking = ServiceChargeBookingEntry.from_dict(booking_bp)
                scs_account.add_booking_entry(scs_booking)
            scs_balance.add_account(scs_account)
        scs_balance.save(FILE_CONFIG['_oldaccounting'])
