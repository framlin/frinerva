from _oldaccounting.accounting import Accounting
from _oldaccounting.account import AccountJSONEncoder, Account
from _oldaccounting.balance import BalanceJSONEncoder

from decimal import Decimal, ROUND_HALF_UP

from config import FILE_CONFIG
from utils.utils import create_cost_center_list


class AccountingController:
    def __init__(self, accounting: Accounting):
        self._accounting = accounting
        self._cents = Decimal('0.01')

    def get_account(self, year: int, cost_center: str) -> dict:
        balance = self._accounting.get_balance(year)
        account = balance.get_account(cost_center)

        account_dict = AccountJSONEncoder().default(account)
        account_dict['balance'] = account.get_balance()

        return account_dict

    def get_balance(self, year: int) -> dict:
        balance = self._accounting.get_balance(year)
        balance_dict: dict = BalanceJSONEncoder().default(balance)

        totals = [acc.get_balance()["total"] for acc in balance]
        outgoing_payments = [acc.get_balance()["outgoing_payments"] for acc in balance]
        received_payments = [acc.get_balance()["received_payments"] for acc in balance]

        i = 0
        total = 0
        outgoing = 0
        received = 0

        for account in balance_dict['_accounts']:

            account['balance'] = totals[i]
            account['outgoing_payments'] = outgoing_payments[i]
            account['received_payments'] = received_payments[i]

            total += totals[i]
            outgoing += outgoing_payments[i]
            received += received_payments[i]
            i += 1

        balance_dict['total'] = Decimal(total).quantize(self._cents, ROUND_HALF_UP)
        balance_dict['outgoing'] = Decimal(outgoing).quantize(self._cents, ROUND_HALF_UP)
        balance_dict['received'] = Decimal(received).quantize(self._cents, ROUND_HALF_UP)

        return balance_dict

    @staticmethod
    def get_cost_center_list() -> list:
        return [cc for cc in create_cost_center_list()]

    @staticmethod
    def get_booking_periods() -> list:
        return [year for year in range(2019, 2022)]

    @staticmethod
    def _find_booking_entry(account: Account, an_id: str):
        for entry in account:
            if entry.get_id() == an_id:
                return entry

    def update_booking_entry(self, year, entry):
        balance = self._accounting.get_balance(year)
        account = balance.get_account(entry['_cost_center'])
        booking_entry = AccountingController._find_booking_entry(account, entry['_id'])
        booking_entry.update_from_dict(entry)
        balance.save(FILE_CONFIG['_oldaccounting'])
        return self.get_balance(year)
