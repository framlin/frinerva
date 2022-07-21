from unittest import TestCase
from accounting.importer import BankingCSVFileImporter
from accounting.booking_entry import BookingEntry
from accounting.account import Account


def csvDictReaderMock(csv_dict):
    def reader(file, delimiter):
        return csv_dict

    return reader

def create_empty_file_mock():
    return csvDictReaderMock([])


def create_one_line_mock():
    entry = {'Datum': "01.01.2022",
             'Wertstellung': 0,
             'Kategorie': "A",
             'Name': "B",
             'Verwendungszweck': "C",
             'Konto': 0,
             'Bank': 0,
             'Betrag': "1,0",
             'Währung': 0
             }
    return csvDictReaderMock([entry])


def create_two_lines_mock():
    input = [{'Datum': "01.01.2022",
              'Wertstellung': 0,
              'Kategorie': "A",
              'Name': "B",
              'Verwendungszweck': "C",
              'Konto': 0,
              'Bank': 0,
              'Betrag': "1,0",
              'Währung': 0
              }, {'Datum': "01.01.2022",
                  'Wertstellung': 0,
                  'Kategorie': "A1",
                  'Name': "B1",
                  'Verwendungszweck': "C1",
                  'Konto': 0,
                  'Bank': 0,
                  'Betrag': "12,0",
                  'Währung': 0
                  }]
    return csvDictReaderMock(input)


def import_file(csv_file_reader):
    return BankingCSVFileImporter.import_bookings("file", csv_file_reader, ";")


class TestBankingCSVFileImporter_import_bookings(TestCase):

    def test_import_empty_file(self):
        csv_file_reader = create_empty_file_mock()
        bookings = import_file(csv_file_reader)
        self.assertEqual([], bookings, 'result list is no empty list')

    def test_one_line(self):

        result = BookingEntry({'Datum': "01.01.2022",
                               'Kategorie': "A",
                               'Name': "B",
                               'Verwendungszweck': "C",
                               'Betrag': 1.0
                               }, "BC01")

        csv_file_reader = create_one_line_mock()
        bookings = import_file(csv_file_reader)
        self.assertEqual([result], bookings, 'result list has wrong entry')

    def test_two_lines(self):

        result = [BookingEntry({'Datum': "01.01.2022",
                                'Kategorie': "A",
                                'Name': "B",
                                'Verwendungszweck': "C",
                                'Betrag': 1.0
                                }, "BC01"),
                  BookingEntry({'Datum': "01.01.2022",
                                'Kategorie': "A1",
                                'Name': "B1",
                                'Verwendungszweck': "C1",
                                'Betrag': 12.0
                                }, "BC01")]

        csv_file_reader = create_two_lines_mock()
        bookings = import_file(csv_file_reader)
        self.assertEqual(result, bookings, 'result list has wrong entry')


class TestBankingCSVFileImporter_add_booking_entries_to_account(TestCase):

    def test_add_no_booking_entry_to_account(self):
        account = Account("RENT")
        bookings = import_file(create_empty_file_mock())
        BankingCSVFileImporter.add_booking_entries_to_account(bookings, account);
        self.assertEqual(0, len(account.get_bookings()), 'bookings should have 0 - length')

    def test_add_one_booking_entry_to_account(self):
        account = Account("RENT")
        bookings = import_file(create_one_line_mock())
        BankingCSVFileImporter.add_booking_entries_to_account(bookings, account);
        self.assertEqual(1, len(account.get_bookings()), 'bookings should have 0 - length')

    def test_add_two_booking_entries_to_account(self):
        account = Account("RENT")
        bookings = import_file(create_two_lines_mock())
        BankingCSVFileImporter.add_booking_entries_to_account(bookings, account);
        self.assertEqual(2, len(account.get_bookings()), 'bookings should have 0 - length')
