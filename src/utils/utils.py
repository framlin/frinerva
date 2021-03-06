import csv
import os

from accounting.cost_center_mapping import cost_center_mapping as ccm
from accounting.booking_entry import BookingEntry
from accounting.account import Account
from accounting.balance import Balance
from accounting.accounting import Accounting


def init_accounting(accounting: Accounting) -> Accounting:
    cost_center_set = create_cost_center_set()

    for bp in range(2019, 2022):
        balance = Balance(booking_period=bp)

        for cc in cost_center_set:
            balance.add_account(Account(cc))

        accounting.add_balance(balance)

    return accounting


def create_cost_center_set() -> set:
    cost_center_set = set()
    for cc in ccm.values():
        cost_center_set.add(cc)
    return cost_center_set


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
    return "import of " + fn + " successfull"


def _import_csv_row(accounting, row):
    booking_entry = BookingEntry(float(row['Betrag'].replace(',', '.')), row['Name'], row['Verwendungszweck'], row['Datum'])
    booking_period = get_booking_period(row['Datum'])
    cost_center = get_cost_center(row['Kategorie'])
    period_balance = accounting.get_balance(booking_period)
    account = period_balance.get_account(cost_center)
    account.add_booking_entry(booking_entry)
    # account.save('../data')
    period_balance.save('../data')


def create_directories(root):
    cost_center_set = create_cost_center_set()
    for year in range(2019, 2022):
        print(root+str(year)+'/accounts')
        # os.mkdir(root + str(year) + '/accounts')
        for cc in cost_center_set:
            print(root+str(year)+'/accounts/'+cc)
            # os.mkdir(root + str(year) + '/accounts/'+cc)

