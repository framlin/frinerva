from config import FILE_CONFIG
from os import path

# ACTION = "IMPORT"
ACTION = "SERVER"

if ACTION == 'IMPORT':
    from utils.utils import import_banking_csv_file, insert_booking_codes, import_scs_blueprint
    # import_banking_csv_file(path.join(FILE_CONFIG['imports'], '2019_MANUAL.csv'))
    # import_banking_csv_file(path.join(FILE_CONFIG['imports'], '2021.csv'))
    import_scs_blueprint(2021)

if ACTION == 'SERVER':
    from utils.utils import load_accounting, load_service_charge_statment
    from webserver import server
    from middleware.accounting_controller import AccountingController
    from middleware.service_charge_controller import ServiceChargeController
    accounting = load_accounting(FILE_CONFIG['accounting'])
    service_charge_statement = load_service_charge_statment(FILE_CONFIG['accounting'])
    server.run_server(AccountingController(accounting), ServiceChargeController(service_charge_statement))

