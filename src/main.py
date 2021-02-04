# from utils.utils import import_banking_csv_file
#
# import_banking_csv_file('../data/import/2019.csv')

# from webserver import server
# server.run_server()


from utils.utils import load_account, load_balance, load_accounting

load_accounting('../data')