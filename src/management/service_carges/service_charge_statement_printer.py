from odf import opendocument, text, teletype
from odf.text import P
from odf.table import Table, TableColumn, TableRow, TableCell

from os import path

from datetime import date

from management.service_carges.service_charge_statement import ServiceChargeStatement
from config import FILE_CONFIG


def _replace(item, src, pattern, replacement):
    if src.find(pattern) != -1:
        src = src.replace(pattern, replacement)
        new_item = text.P()
        new_item.setAttribute('stylename', item.getAttribute('stylename'))
        new_item.addText(src)
        item.parentNode.insertBefore(new_item, item)
        item.parentNode.removeChild(item)


def _replace_table(item, src, pattern, scs_list):
    if src.find(pattern) != -1:
        table = Table()
        table.addElement(TableColumn())
        table.addElement(TableColumn())
        for elem in scs_list:
            tr = TableRow()
            table.addElement(tr)
            tc = TableCell()
            tr.addElement(tc)
            p = P(text=elem[0])
            tc.addElement(p)
            tc2 = TableCell()
            tr.addElement(tc2)
            p2 = P(text=str(elem[1]) + ' €')
            tc2.addElement(p2)

        item.parentNode.insertBefore(table, item)
        item.parentNode.removeChild(item)


def print_service_charge_statement(scs: ServiceChargeStatement, year: int):

    scs_costs, advance, saldo = scs.compute_scs_saldo(year, 'RENTAL')
    scs_list = scs.get_non_advance_payment_entries(year, "RENTAL")
    aktuelles_datum = date.today().strftime("%d.%m.%Y")

    doc = opendocument.load(path.join(FILE_CONFIG['reports'], 'scs_template.odt'))

    for item in doc.getElementsByType(text.P):
        s = teletype.extractText(item)

        _replace(item, s, '[[date]]', str(aktuelles_datum))
        _replace(item, s, '[[year]]', str(year))
        _replace(item, s, '[[cost]]', str(scs_costs))
        _replace(item, s, '[[advance]]', str(advance))
        _replace(item, s, '[[saldo]]', str(saldo))

        _replace_table(item, s, '[[scs_list]]', scs_list)

    doc.save(path.join(FILE_CONFIG['reports'], 'result.odt'))


