from accounting.account import Account

import json
import os


class Balance:
    def __init__(self, booking_period: int):
        self._booking_period = booking_period
        self._accounts = dict()

    def add_account(self, account: Account):
        self._accounts[account.get_cost_center()] = account

    def get_account(self, cost_center: str) -> Account:
        return self._accounts[cost_center]

    def get_booking_period(self) -> int:
        return self._booking_period

    def save(self,path: str):
        balance_path = os.path.join(path, str(self._booking_period))
        if not os.path.exists(balance_path):
            os.mkdir(balance_path)

        balance_path = os.path.join(balance_path, 'accounts')
        if not os.path.exists(balance_path):
            os.mkdir(balance_path)

        for account in self._accounts.values():
            account.save(balance_path)
