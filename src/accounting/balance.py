from accounting.account import Account


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
