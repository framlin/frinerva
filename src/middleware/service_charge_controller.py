from management.service_carges.service_charge_balance import ServiceChargeBalanceJSONEncoder
from management.service_carges.service_charge_statement import ServiceChargeStatement
from config import FILE_CONFIG

class ServiceChargeController:
    def __init__(self, service_charge_statment: ServiceChargeStatement):
        self._service_charge_statment = service_charge_statment

    def get_service_charge_statment(self, year):
        scs = self._service_charge_statment.get_service_charge_balances_for_booking_period(year)
        result = dict()
        for scs_type, scs_balance in scs.items():
            account_dict = ServiceChargeBalanceJSONEncoder().default(scs_balance)
            result[scs_type] = account_dict

        return result

    def save_service_charge_statment(self, year):
        self._service_charge_statment.save(FILE_CONFIG['accounting'], year)
        return self.get_service_charge_statment(year)

    def update_service_charge_statment(self, year, scs):
        self._service_charge_statment.update(year, scs)
        return self.save_service_charge_statment(year)
        # return self.get_service_charge_statment(year)

    def remove_scs_booking_entry(self, year, scs):
        self._service_charge_statment.remove(year, scs)
        return self.save_service_charge_statment(year)
        # return self.get_service_charge_statment(year)

    def add_scs_booking_entry(self, year, scs):
        self._service_charge_statment.add(year, scs)
        return self.save_service_charge_statment(year)
        # return self.get_service_charge_statment(year)
