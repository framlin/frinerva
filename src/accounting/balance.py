from json import JSONEncoder
from accounting.account import Account, AccountJSONEncoder
import os


class Balance:
    BALANCE_DIR = 'accounts'

    def __init__(self, booking_period: int):
        self._booking_period = booking_period
        self._accounts = dict()

    def add_account(self, account: Account):
        self._accounts[account.get_cost_center()] = account

    def get_account(self, cost_center: str) -> Account:
        return self._accounts[cost_center]

    def get_accounts(self) -> dict:
        return self._accounts

    def get_booking_period(self) -> int:
        return self._booking_period

    def save(self, path: str):
        balance_path = self._create_balance_path(path, Balance.BALANCE_DIR)

        for account in self:
            account.save(balance_path)

    def _create_balance_path(self, path, balance_dir):
        balance_path = os.path.join(path, str(self._booking_period))
        if not os.path.exists(balance_path):
            os.mkdir(balance_path)
        balance_path = os.path.join(balance_path, balance_dir)
        if not os.path.exists(balance_path):
            os.mkdir(balance_path)
        return balance_path

    def load(self, path: str):
        balance_path = os.path.join(path, str(self._booking_period))
        balance_path = os.path.join(balance_path, Balance.BALANCE_DIR)
        subfolders = [f.path for f in os.scandir(balance_path) if f.is_dir()]

        for cost_center_path in subfolders:
            self.add_account(Account(os.path.basename(cost_center_path)))

        for account in self:
            account.load(balance_path)

    def __iter__(self):
        return BalanceIterator(self)


class BalanceIterator:
    def __init__(self, balance):
        self._accounts = balance.get_accounts()
        self._keys = list(self._accounts.keys())
        self._index = 0

    def __next__(self):
        if self._index < len(self._keys):
            result = self._accounts[self._keys[self._index]]
            self._index += 1
            return result

        raise StopIteration


class BalanceJSONEncoder(JSONEncoder):
    def default(self, balance) -> dict:
        result = dict()
        result['_booking_period'] = balance.get_booking_period()
        result['_accounts'] = [AccountJSONEncoder().default(account) for account in balance]

        return result
