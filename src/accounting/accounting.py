from accounting.balance import Balance
import os


class Accounting:
    def __init__(self):
        self._balances = dict()

    def add_balance(self, balance: Balance):
        self._balances[str(balance.get_booking_period())] = balance

    def get_balance(self, booking_period: int) -> Balance:
        return self._balances[str(booking_period)]

    def load(self, path):
        subfolders = [f.path for f in os.scandir(path) if f.is_dir()]
        for booking_period_path in subfolders:
            booking_period = os.path.basename(booking_period_path)
            if booking_period.isdigit():
                self.add_balance(Balance(int(booking_period)))
        for balance in self._balances.values():
            balance.load(path)
