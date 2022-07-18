from decimal import Decimal, ROUND_HALF_UP
from _oldaccounting.cost_center_mapping import cost_center_mapping as ccm


def round_money(value):
    _cents = Decimal('0.01')
    return float(Decimal(value).quantize(_cents, ROUND_HALF_UP))


def create_cost_center_list() -> list:
    return [cc for cc in ccm.values()]


def get_booking_period(date):
    return date.split('.')[2]


def get_cost_center(cost_center: str) -> str:
    return ccm[cost_center.split(' - ')[-1]]
