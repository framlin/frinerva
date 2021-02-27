from accounting.balance import Balance, BalanceJSONEncoder
from accounting.account import Account
import os

from management.service_carges.service_charge_account import ServiceChargeAccount


class ServiceChargeBalance(Balance):
    BALANCE_DIR = 'service_charges'
    HOUSE_SPACE = 275
    DWELLING_SPACE = 65
    DWELLING_COUNT = 3

    def __init__(self, service_charge_type: str, booking_period: int):
        super().__init__(booking_period)
        self._service_charge_type = service_charge_type

    def get_service_charge_type(self):
        return self._service_charge_type

    def save(self, path: str):
        scs_balance_path = self._create_balance_path(path, ServiceChargeBalance.BALANCE_DIR)
        scs_balance_path = os.path.join(scs_balance_path, self._service_charge_type)
        if not os.path.exists(scs_balance_path):
            os.mkdir(scs_balance_path)
        for account in self:
            account.save(scs_balance_path)

    def load(self, path: str):
        balance_path = os.path.join(path, str(self._booking_period))
        balance_path = os.path.join(balance_path, ServiceChargeBalance.BALANCE_DIR)
        balance_path = os.path.join(balance_path, self._service_charge_type)
        subfolders = [f.path for f in os.scandir(balance_path) if f.is_dir()]

        for sc_type_path in subfolders:
            self.add_account(ServiceChargeAccount(os.path.basename(sc_type_path)))

        for account in self:
            account.load(balance_path)

        pass

class ServiceChargeBalanceJSONEncoder(BalanceJSONEncoder):
    pass
