import json
import math
from os import path, scandir
from config import FILE_CONFIG

from management.service_carges.service_charge_balance import ServiceChargeBalance
from management.service_carges.service_charge_booking_entry import ServiceChargeBookingEntry


class ServiceChargeStatement:
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

    def save(self, a_path, year):
        balances = self.get_service_charge_balances_for_booking_period(year)
        balances_path = path.join(a_path, str(year))
        for balance in balances.values():
            balance.save(a_path)
        pass

    def add_service_charge_balance(self, balance: ServiceChargeBalance):
        year = str(balance.get_booking_period())
        scs_type = balance.get_service_charge_type()
        if year not in self._balances:
            self._balances[year] = dict()
        self._balances[year][scs_type] = balance

    def get_service_charge_balance(self, booking_period: int, scs_type: str) -> ServiceChargeBalance:
        return self._balances[str(booking_period)][scs_type]

    def get_service_charge_balances_for_booking_period(self, booking_period: int) -> dict:
        return self._balances[str(booking_period)]

    def get_service_charge_balances(self) -> dict:
        return self._balances

    def load_blueprint(self):
        in_fn = path.join(FILE_CONFIG['blueprints'], 'service_charge_statement.json')
        try:
            with open(in_fn, 'r') as infile:
                self._blueprint = json.load(infile, cls=json.JSONDecoder)
        except json.JSONDecodeError:
            pass

    def get_blueprint(self, sc_type) -> dict:
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

    def _get_dirty_entries(self, scs):
        result = list()
        for balance in scs.values():
            if type(balance) == dict:
                for account in balance['_accounts']:
                    for booking in account['_bookings']:
                        if '_dirty' in booking:
                            result.append(booking)

        return result

    def _find_entry(self, scs_balance, entry):
        _id = entry['_id']
        # for balance in scs_balance.values():
        for account in scs_balance:
            for scs_entry in account:
                if scs_entry._id == _id:
                    return scs_entry

    def update(self, year, scs):
        # dirty_entries = self._get_dirty_entries(scs)
        scs_balance = self._balances[year][scs['_scs_type']]
        scs_entry = self._find_entry(scs_balance, scs)
        scs_entry.update(scs)

    def _delete_entry_in_balance(self, balance, scs):
        _id = scs['_id']
        for account in balance:
            for scs_entry in account:
                if scs_entry._id == _id:
                    account.remove(scs_entry)

    def _add_entry_to_balance(self, balance, scs):
        account = balance.get_account(scs['_cost_center'])
        booking_entry = ServiceChargeBookingEntry.from_dict(scs)
        account.add_booking_entry(booking_entry)

    def remove(self, year, scs):
        scs_balance = self._balances[year][scs['_scs_type']]
        self._delete_entry_in_balance(scs_balance, scs)

    def add(self, year, scs):
        scs_balance = self._balances[year][scs['_scs_type']]
        self._add_entry_to_balance(scs_balance, scs)

    def transfer(self, year, account_dict):
        dwelling_balance = self._balances[year]['DWELLING']
        for account in dwelling_balance:
            for be in account_dict['_bookings']:
                scs_be_list = account.get_booking_entry_by_booking_code(be['_booking_code'])
                if len(scs_be_list) == 1:
                    scs_be_list[0].add_amount(math.fabs(be['_amount']))

    @staticmethod
    def _forward_entry(from_be, to_be):
        from_portion = from_be.get_portion()
        if from_portion != ServiceChargeStatement.NO_FORWARD:
            from_amount = from_be.get_amount()
            if from_portion == ServiceChargeStatement.FULL:
                to_amount = from_amount
            elif from_portion == ServiceChargeStatement.PER_QM:  # TODO connect to Dwelling-Class and House-Class
                to_amount = float(from_amount / ServiceChargeBalance.HOUSE_SPACE) * ServiceChargeBalance.DWELLING_SPACE
            elif from_portion == ServiceChargeStatement.PER_DWELLING:  # TODO connect to Dwelling-Class and House-Class
                to_amount = float(from_amount/ServiceChargeBalance.DWELLING_COUNT)

            to_be.set_amount(to_amount)
            from_name = from_be.get_name()
            to_be.set_name(from_name)

    def forward(self, year, from_to):
        from_balance = self._balances[year][from_to['from']]
        to_balance = self._balances[year][from_to['to']]
        from_account = from_balance.get_accounts()['SERVICE_CHARGES']
        to_account = to_balance.get_accounts()['SERVICE_CHARGES']

        for from_be in from_account:
            to_be_list = to_account.get_booking_entry_by_booking_code(from_be.get_booking_code())
            if len(to_be_list) == 1:
                ServiceChargeStatement._forward_entry(from_be, to_be_list[0])

    def __iter__(self):
        for year in self._balances:
            for balance in self._balances[year].values():
                yield balance

        return

