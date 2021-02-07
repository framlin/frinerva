from accounting.balance import Balance
import os


class Accounting:
    def __init__(self):
        self._balances = dict()

    def add_balance(self, balance: Balance):
        self._balances[str(balance.get_booking_period())] = balance

    def get_balance(self, booking_period: int) -> Balance:
        return self._balances[str(booking_period)]

    def get_balances(self) -> dict:
        return self._balances

    def load(self, path):
        subfolders = [f.path for f in os.scandir(path) if f.is_dir()]
        for booking_period_path in subfolders:
            booking_period = os.path.basename(booking_period_path)
            if booking_period.isdigit():
                self.add_balance(Balance(int(booking_period)))

        for balance in self:
            balance.load(path)

    def __iter__(self):
        return AccountingIterator(self)


class AccountingIterator:
    def __init__(self, accounting):
        self._balances = accounting.get_balances()
        self._keys = list(self._balances.keys())
        self._index = 0

    def __next__(self):
        if self._index < len(self._keys):
            result = self._balances[self._keys[self._index]]
            self._index += 1
            return result

        raise StopIteration
