from unittest import TestCase
from accounting.booking_entry import BookingEntry


class TestBookingEntry(TestCase):

    def test_equality(self):
        booking_entry_values = {
            'Datum': "01.01.2022",
            'Kategorie': "A",
            'Name': "B",
            'Verwendungszweck': "C",
            'Betrag': 1.0
        }
        booking_entry_A = BookingEntry(booking_entry_values, "BC01")
        booking_entry_B = BookingEntry(booking_entry_values, "BC01")
        self.assertEqual(booking_entry_A, booking_entry_B, 'the booking-entries are NOT equal')

    def test_different_booking_codes(self):
        booking_entry_values = {
            'Datum': "01.01.2022",
            'Kategorie': "A",
            'Name': "B",
            'Verwendungszweck': "C",
            'Betrag': 1.0
        }
        booking_entry_A = BookingEntry(booking_entry_values, "BC01")
        booking_entry_B = BookingEntry(booking_entry_values, "BC012")
        self.assertNotEqual(booking_entry_A, booking_entry_B, 'the booking-entries are NOT different')

    def test_different_data(self):
        booking_entry_values = {
            'Datum': "01.01.2022",
            'Kategorie': "A",
            'Name': "B",
            'Verwendungszweck': "C",
            'Betrag': 1.0
        }
        booking_entry_values_2 = {
            'Datum': "01.01.2022",
            'Kategorie': "A",
            'Name': "B",
            'Verwendungszweck': "C",
            'Betrag': 2.0
        }

        booking_entry_A = BookingEntry(booking_entry_values, "BC01")
        booking_entry_B = BookingEntry(booking_entry_values_2, "BC01")
        self.assertNotEqual(booking_entry_A, booking_entry_B, 'the booking-entries are NOT different')


if __name__ == '__main__':
    unittest.main()
