from unittest import TestCase
from importer import BankingCSVFileImporter
from accounting.booking_entry import BookingEntry


def csvDictReaderMock(csv_dict):
    def reader(file, delimiter):
        return csv_dict

    return reader


class TestBankingCSVFileImporter(TestCase):

    def test_import_empty_file(self):
        csv_file_reader = csvDictReaderMock([])
        importer = BankingCSVFileImporter()
        bookings = importer.import_bookings("file", csv_file_reader, ";")
        self.assertEqual([], bookings, 'result list is no empty list')

    def test_one_line(self):
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

        result = BookingEntry({'Datum': "01.01.2022",
                               'Kategorie': "A",
                               'Name': "B",
                               'Verwendungszweck': "C",
                               'Betrag': 1.0
                               }, "BC01")

        csv_file_reader = csvDictReaderMock([entry])
        importer = BankingCSVFileImporter()
        bookings = importer.import_bookings("file_name", csv_file_reader, ";")
        self.assertEqual([result], bookings, 'result list has wrong entry')

    def test_two_lines(self):
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

        csv_file_reader = csvDictReaderMock(input)
        importer = BankingCSVFileImporter()
        bookings = importer.import_bookings("file_name", csv_file_reader, ";")
        self.assertEqual(result, bookings, 'result list has wrong entry')
