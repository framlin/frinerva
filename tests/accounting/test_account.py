from unittest import TestCase
from accounting.account import Account

class TestAccount(TestCase):
    def setUp(self) -> None:
        self.account = Account("RENT")

    def test_creating_account(self):
        self.assertEqual("RENT", self.account.get_cost_center(), 'coste-center should be RENT')

    def test_add_empty_list(self):
        self.account.add_booking_entries([])
        self.assertEqual(self.account.get_bookings(), [])

    def test_add_one_element_list(self):
        self.account.add_booking_entries([1,2])
        self.assertEqual(self.account.get_bookings(), [1,2])
