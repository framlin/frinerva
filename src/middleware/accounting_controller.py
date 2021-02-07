from accounting.accounting import Accounting
from accounting.account import AccountJSONEncoder
from accounting.balance import BalanceJSONEncoder

from utils.utils import create_cost_center_list


class AccountingController:
    def __init__(self, accounting: Accounting):
        self._accounting = accounting

    def get_account(self, year: int, cost_center: str) -> dict:
        balance = self._accounting.get_balance(year)
        account = balance.get_account(cost_center)

        account_dict = AccountJSONEncoder().default(account)
        account_dict['balance'] = account.get_balance()

        return account_dict

    def get_balance(self, year: int) -> dict:
        balance = self._accounting.get_balance(year)
        accounts = balance.get_accounts()
        # totals = list()
        # for acc in accounts.values():
        #     totals.append(acc.get_balance())
        #
        balance_dict = BalanceJSONEncoder().default(balance)
        totals = [acc.get_balance() for acc in accounts.values()]
        i = 0
        total = 0
        for account in balance_dict['_accounts']:
            account['balance'] = totals[i]
            total += totals[i]
            i += 1
        balance_dict['total'] = total
        return balance_dict

    @staticmethod
    def get_cost_center_list() -> list:
        return [cc for cc in create_cost_center_list()]

    @staticmethod
    def get_booking_periods() -> list:
        return [year for year in range(2019, 2022)]
