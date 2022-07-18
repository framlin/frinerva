from management.service_carges.service_charge_balance import ServiceChargeBalanceJSONEncoder
from management.service_carges.service_charge_statement import ServiceChargeStatement
from management.service_carges.service_charge_statement_printer import print_service_charge_statement
from config import FILE_CONFIG


class ServiceChargeController:
    def __init__(self, service_charge_statment: ServiceChargeStatement):
        self._service_charge_statment = service_charge_statment

    def get_service_charge_statment(self, year: str):
        scs = self._service_charge_statment.get_service_charge_balances(int(year))
        result = dict()
        for scs_type, scs_balance in scs.items():
            account_dict = ServiceChargeBalanceJSONEncoder().default(scs_balance)
            result[scs_type] = account_dict

        return result

    def save_service_charge_statment(self, year: str):
        self._service_charge_statment.save(FILE_CONFIG['_oldaccounting'], int(year))
        return self.get_service_charge_statment(year)

    def update_scs_booking_entry(self, year: str, scs: dict):
        self._service_charge_statment.update(year, scs)
        return self.save_service_charge_statment(year)

    def remove_scs_booking_entry(self, year: str, scs: dict):
        self._service_charge_statment.remove(year, scs)
        return self.save_service_charge_statment(year)

    def add_scs_booking_entry(self, year: str, scs: dict):
        self._service_charge_statment.add(year, scs)
        return self.save_service_charge_statment(year)

    def transfer(self, year: str, booking_entries: dict):
        self._service_charge_statment.transfer(year, booking_entries)
        return self.save_service_charge_statment(year)

    def forward(self, year: str, from_to: dict):
        self._service_charge_statment.forward(year, from_to)
        return self.save_service_charge_statment(year)

    def print(self, year: str):
        print_service_charge_statement(self._service_charge_statment, int(year))
        return self.get_service_charge_statment(year)
