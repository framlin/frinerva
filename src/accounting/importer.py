import csv

class BankingCSVFileImporter:
    def __int__(self, file_name, csv_file_reader, delimiter):
        pass





#
# from accounting.account import Account
# from accounting.accounting import Accounting
# from accounting.balance import Balance

# from accounting.booking_entry import BookingEntry
# from config import FILE_CONFIG
# from utils.utils import create_cost_center_list, get_booking_period, get_cost_center
#
#
# def import_banking_csv_file(fn):
#     accounting = _init_accounting(Accounting())
#     with open(fn, newline='') as cvsfile:
#         bookingreader = csv.DictReader(cvsfile, delimiter=';')
#         for row in bookingreader:
#             _import_csv_row(accounting, row)
#     return "import of " + fn + " successful"
#
#
# def _init_accounting(accounting: Accounting) -> Accounting:
#     cost_center_set = create_cost_center_list()
#
#     for bp in range(2019, 2022):
#         balance = Balance(booking_period=bp)
#
#         for cc in cost_center_set:
#             balance.add_account(Account(cc))
#
#         accounting.add_balance(balance)
#
#     return accounting
#
#
# def _import_csv_row(accounting, row):
#     print(row)
#     booking_entry = BookingEntry(
#         float(row['Betrag'].replace(',', '.')),
#         row['Name'],
#         row['Verwendungszweck'],
#         row['Datum'],
#         'BC00'
#     )
#     booking_period = get_booking_period(row['Datum'])
#     cost_center = get_cost_center(row['Kategorie'])
#     period_balance = accounting.get_balance(booking_period)
#     account = period_balance.get_account(cost_center)
#     account.add_booking_entry(booking_entry)
#     period_balance.save(FILE_CONFIG['accounting'])
