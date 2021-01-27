from accounting.balance import Balance


class Accounting:
    def __init__(self):
        self._balances = dict()

    def add_balance(self, balance: Balance):
        self._balances[str(balance.get_booking_period())] = balance

    def get_balance(self, booking_period: int) -> Balance:
        return self._balances[str(booking_period)]
