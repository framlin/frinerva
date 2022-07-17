import csv
from unittest import TestCase
from importer import BankingCSVFileImporter

def csvDictReaderMock(csv_dict):
    def reader(file, delimiter):
        return csv_dict

    return reader

class Test(TestCase):
    def test_import_empty_file(self):
        csv_file_reader = csvDictReaderMock({})
        importer = BankingCSVFileImporter("file_name", csv_file_reader, ";")


