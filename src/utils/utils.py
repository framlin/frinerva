import csv
from json import loads
from config import FILE_CONFIG
from accounting.cost_center_mapping import cost_center_mapping as ccm
from accounting.booking_entry import BookingEntry
from accounting.account import Account
from accounting.balance import Balance
from accounting.accounting import Accounting
from management.service_carges.service_charge_statement import ServiceChargeStatement
from management.service_carges.service_charge_balance import ServiceChargeBalance
from management.service_carges.service_charge_types import SERVICE_CHARGE_TYPES
from management.service_carges.service_charge_booking_entry import ServiceChargeBookingEntry

def init_accounting(accounting: Accounting) -> Accounting:
    cost_center_set = create_cost_center_list()

    for bp in range(2019, 2022):
        balance = Balance(booking_period=bp)

        for cc in cost_center_set:
            balance.add_account(Account(cc))

        accounting.add_balance(balance)

    return accounting


def create_cost_center_list() -> list:
    return [cc for cc in ccm.values()]


def get_booking_period(date):
    return date.split('.')[2]


def get_cost_center(cost_center: str) -> str:
    return ccm[cost_center.split(' - ')[-1]]


def import_banking_csv_file(fn):
    accounting = init_accounting(Accounting())
    with open(fn, newline='') as cvsfile:
        bookingreader = csv.DictReader(cvsfile, delimiter=';')
        for row in bookingreader:
            _import_csv_row(accounting, row)
    return "import of " + fn + " successful"


def _import_csv_row(accounting, row):
    print(row)
    booking_entry = BookingEntry(
        float(row['Betrag'].replace(',', '.')),
        row['Name'],
        row['Verwendungszweck'],
        row['Datum'],
        'BC00'
    )
    booking_period = get_booking_period(row['Datum'])
    cost_center = get_cost_center(row['Kategorie'])
    period_balance = accounting.get_balance(booking_period)
    account = period_balance.get_account(cost_center)
    account.add_booking_entry(booking_entry)
    period_balance.save(FILE_CONFIG['accounting'])


def load_accounting(path: str) -> Accounting:
    accounting = Accounting()
    accounting.load(path)
    print(accounting)
    return accounting


def load_service_charge_statment(path: str) -> ServiceChargeStatement:
    scs = ServiceChargeStatement()
    scs.load(path)
    return scs


def insert_booking_codes(path: str):
    accounting = load_accounting(path)
    for balance in accounting:
        for acc in balance:
            for be in acc:
                be['_booking_code'] = 'BC00'
                print(be)


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
        scs_balance.save(FILE_CONFIG['accounting'])


