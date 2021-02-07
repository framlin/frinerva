# from utils.utils import import_banking_csv_file
#
# import_banking_csv_file('../data/import/2021.csv')

from utils.utils import load_account, load_balance, load_accounting
from webserver import server
from middleware.accounting_controller import AccountingController

accounting = load_accounting('../data')

server.run_server(AccountingController(accounting))


