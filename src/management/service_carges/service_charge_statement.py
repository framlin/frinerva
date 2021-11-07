import json
import math
from os import path, scandir

from config import FILE_CONFIG
from management.service_carges.service_charge_balance import ServiceChargeBalance
from management.service_carges.service_charge_booking_entry import ServiceChargeBookingEntry

from utils import utils


class ServiceChargeStatement:
    SERVICE_CHARGE_COST_CENTER = 'SERVICE_CHARGES'
    NO_FORWARD = 0
    PER_QM = 1
    PER_DWELLING = 2
    FULL = 100

    def __init__(self):
        self._blueprint = ''
        self._balances = dict()

    def load(self, a_path: str):
        subfolders = [f.path for f in scandir(a_path) if f.is_dir()]
        for booking_period_path in subfolders:
            booking_period = path.basename(booking_period_path)
            if booking_period.isdigit():
                scs_path = path.join(a_path, str(booking_period))
                scs_path = path.join(scs_path, ServiceChargeBalance.BALANCE_DIR)

                subfolders = [f.path for f in scandir(scs_path) if f.is_dir()]
                for scs_type in subfolders:
                    self.add_service_charge_balance(ServiceChargeBalance(path.basename(scs_type), int(booking_period)))

                for balance in self:
                    balance.load(a_path)

    def save(self, a_path: str, year: int):
        balances = self.get_service_charge_balances(year)
        for balance in balances.values():
            balance.save(a_path)

    def add_service_charge_balance(self, balance: ServiceChargeBalance):
        year = str(balance.get_booking_period())
        scs_type = balance.get_service_charge_type()
        if year not in self._balances:
            self._balances[year] = dict()
        self._balances[year][scs_type] = balance

    def get_service_charge_balance(self, booking_period: int, scs_type: str) -> ServiceChargeBalance:
        return self._balances[str(booking_period)][scs_type]

    def get_service_charge_balances(self, booking_period: int = 0) -> dict:
        result = self._balances
        if booking_period != 0:
            result = self._balances[str(booking_period)]
        return result

    def load_blueprint(self):
        in_fn = path.join(FILE_CONFIG['blueprints'], 'service_charge_statement.json')
        try:
            with open(in_fn, 'r') as infile:
                self._blueprint = json.load(infile, cls=json.JSONDecoder)
        except json.JSONDecodeError:
            pass

    def get_blueprint(self, sc_type: str) -> dict:
        result = {}
        if self._blueprint == '':
            self.load_blueprint()

        if sc_type == '*':
            result = {'scs': self._blueprint}
        else:
            for scs in self._blueprint:
                # noinspection PyTypeChecker
                if scs['_service_charge_type'] == sc_type:
                    result = {"scs": scs}

        return result

    def update(self, year: str, sc_booking_entry: dict):
        scs_balance = self._balances[year][sc_booking_entry['_scs_type']]
        scs_entry = _find_entry(scs_balance, sc_booking_entry)
        scs_entry.update_from_dict(sc_booking_entry)

    def remove(self, year: str, sc_booking_entry: dict):
        scs_balance = self._balances[year][sc_booking_entry['_scs_type']]
        _delete_entry_in_balance(scs_balance, sc_booking_entry)

    def add(self, year: str, sc_booking_entry: dict):
        scs_balance = self._balances[year][sc_booking_entry['_scs_type']]
        _add_entry_to_balance(scs_balance, sc_booking_entry)

    def transfer(self, year: str, account_dict: dict):
        scs_balance = self._balances[year]['DWELLING']
        for account in scs_balance:
            for be in account_dict['_bookings']:
                scs_be_list = account.get_booking_entry_by_booking_code(be['_booking_code'])
                if len(scs_be_list) == 1:
                    scs_be_list[0].add_amount(math.fabs(be['_amount']))

    def forward(self, year: str, from_to: dict):
        from_balance = self._balances[year][from_to['from']]
        to_balance = self._balances[year][from_to['to']]
        from_account = from_balance.get_accounts()[ServiceChargeStatement.SERVICE_CHARGE_COST_CENTER]
        to_account = to_balance.get_accounts()[ServiceChargeStatement.SERVICE_CHARGE_COST_CENTER]

        for from_be in from_account:
            to_be_list = to_account.get_booking_entry_by_booking_code(from_be.get_booking_code())
            if len(to_be_list) == 1:
                _forward_entry(from_be, to_be_list[0])

    def compute_scs_saldo(self, year: int, scs_type: str):
        dwelling_balance = self.get_service_charge_balance(year, scs_type)
        sc_account = dwelling_balance.get_account(ServiceChargeStatement.SERVICE_CHARGE_COST_CENTER)
        advance_payment = sc_account.get_advance_payment_booking_entries()[0].get_amount()

        scs_costs = 0
        scs_bookings = sc_account.get_bookings()
        for be in scs_bookings:
            if not be.has_advance_payment_booking_code():
                scs_costs += be.get_amount()

        saldo = advance_payment - scs_costs

        # scs_costs = Decimal(scs_costs).quantize(self._cents, ROUND_HALF_UP)
        # advance_payment = Decimal(advance_payment).quantize(self._cents, ROUND_HALF_UP)
        # saldo = Decimal(saldo).quantize(self._cents, ROUND_HALF_UP)

        return utils.round_money(scs_costs), utils.round_money(advance_payment), utils.round_money(saldo)

    def get_non_advance_payment_entries(self, year: int, scs_type: str):
        balance = self.get_service_charge_balance(year, scs_type)
        sc_account = balance.get_account(ServiceChargeStatement.SERVICE_CHARGE_COST_CENTER)

        result = list()
        scs_bookings = sc_account.get_bookings()
        for be in scs_bookings:
            if not be.has_advance_payment_booking_code():
                result.append([be.get_name(), be.get_amount()])

        return result

    def __iter__(self):
        for year in self._balances:
            for balance in self._balances[year].values():
                yield balance

        return


def _forward_entry(from_be: ServiceChargeBookingEntry, to_be: ServiceChargeBookingEntry):
    from_portion = from_be.get_portion()
    to_amount = 0
    if from_portion != ServiceChargeStatement.NO_FORWARD:
        from_amount = from_be.get_amount()
        if from_portion == ServiceChargeStatement.FULL:
            to_amount = from_amount
        elif from_portion == ServiceChargeStatement.PER_QM:  # TODO connect to Dwelling-Class and House-Class
            to_amount = float(from_amount / ServiceChargeBalance.HOUSE_SPACE) * ServiceChargeBalance.DWELLING_SPACE
        elif from_portion == ServiceChargeStatement.PER_DWELLING:  # TODO connect to Dwelling-Class and House-Class
            to_amount = float(from_amount/ServiceChargeBalance.DWELLING_COUNT)

        to_be.set_amount(utils.round_money(to_amount))
        from_name = from_be.get_name()
        to_be.set_name(from_name)


def _find_entry(scs_balance: ServiceChargeBalance, entry: dict) -> ServiceChargeBookingEntry:
    _id = entry['_id']
    for account in scs_balance:
        for scs_entry in account:
            if scs_entry.get_id() == _id:
                return scs_entry


def _delete_entry_in_balance(balance: ServiceChargeBalance, scs: dict):
    _id = scs['_id']
    for account in balance:
        for scs_entry in account:
            if scs_entry.get_id() == _id:
                account.remove(scs_entry)


def _add_entry_to_balance(balance: ServiceChargeBalance, scs: dict):
    account = balance.get_account(scs['_cost_center'])
    booking_entry = ServiceChargeBookingEntry.from_dict(scs)
    account.add_booking_entry(booking_entry)
