from accounting.booking_entry import BookingEntry


class BankingCSVFileImporter:

    def import_bookings(self, file, csv_file_reader, delimiter):
        reader = csv_file_reader(file, delimiter=';')
        result = []
        for row in reader:
            entry = BookingEntry({'Datum': row['Datum'],
                     'Kategorie': row['Kategorie'],
                     'Name': row['Name'],
                     'Verwendungszweck': row['Verwendungszweck'],
                     'Betrag': float(row['Betrag'].replace(',', '.')),
                     }, "BC01")
            result.append(entry)
        return result







#
# from _oldaccounting.account import Account
# from _oldaccounting._oldaccounting import Accounting
# from _oldaccounting.balance import Balance

# from _oldaccounting.booking_entry import BookingEntry
# from config import FILE_CONFIG
# from utils.utils import create_cost_center_list, get_booking_period, get_cost_center
#
#
# def import_banking_csv_file(fn):
#     _oldaccounting = _init_accounting(Accounting())
#     with open(fn, newline='') as cvsfile:
#         bookingreader = csv.DictReader(cvsfile, delimiter=';')
#         for row in bookingreader:
#             _import_csv_row(_oldaccounting, row)
#     return "import of " + fn + " successful"
#
#
# def _init_accounting(_oldaccounting: Accounting) -> Accounting:
#     cost_center_set = create_cost_center_list()
#
#     for bp in range(2019, 2022):
#         balance = Balance(booking_period=bp)
#
#         for cc in cost_center_set:
#             balance.add_account(Account(cc))
#
#         _oldaccounting.add_balance(balance)
#
#     return _oldaccounting
#
#
# def _import_csv_row(_oldaccounting, row):
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
#     period_balance = _oldaccounting.get_balance(booking_period)
#     account = period_balance.get_account(cost_center)
#     account.add_booking_entry(booking_entry)
#     period_balance.save(FILE_CONFIG['_oldaccounting'])
