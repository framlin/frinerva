from accounting.accounting import Accounting
from config import FILE_CONFIG

from management.service_carges.service_charge_statement import ServiceChargeStatement
from webserver import server
from middleware.accounting_controller import AccountingController
from middleware.service_charge_controller import ServiceChargeController


def load_accounting(path: str) -> Accounting:
    result = Accounting()
    result.load(path)
    return result


def load_service_charge_statment(path: str) -> ServiceChargeStatement:
    result = ServiceChargeStatement()
    result.load(path)
    return result


accounting = load_accounting(FILE_CONFIG['accounting'])
service_charge_statement = load_service_charge_statment(FILE_CONFIG['accounting'])

server.run_server(AccountingController(accounting), ServiceChargeController(service_charge_statement))
