from flask import Flask, send_from_directory, redirect, url_for, render_template, request
from utils.utils import import_banking_csv_file

from middleware.accounting_controller import AccountingController
from middleware.service_charge_controller import ServiceChargeController

MAIN_ROOT = '..'

app = Flask('Frinerva',
            static_folder=MAIN_ROOT+"/site",
            static_url_path='/site',
            template_folder=MAIN_ROOT+'/site/templates')


@app.route('/')
def main():
    return redirect(url_for('static', filename='/html/main.html'))


@app.route('/favicon.ico')
def favicon():
    return redirect(url_for('static', filename='/html/favicon.ico'))


# noinspection PyUnresolvedReferences
@app.route('/display/service-charges')
def display_service_charges():
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_service_charges.html', bookingperiods=booking_periods)


@app.route('/service-charges/<year>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def service_charges(year):
    if request.method == 'GET':
        return _service_charge_controller.get_service_charge_statment(year)

    elif request.method == 'POST':
        print(request.json)
        return _service_charge_controller.update_service_charge_statment(year, request.json)

    elif request.method == 'PUT':
        print(request.json)
        return _service_charge_controller.add_scs_booking_entry(year, request.json)
        # return _service_charge_controller.get_service_charge_statment(year)

    elif request.method == 'DELETE':
        print(request.json)
        return _service_charge_controller.remove_scs_booking_entry(year, request.json)
        # return _service_charge_controller.get_service_charge_statment(year)

@app.route('/service-charge/blueprint/<sc_type>')
def service_charge_blueprint(sc_type):
    return _service_charge_controller.get_blueprint(sc_type)


@app.route('/balance/<year>')
def get_balance(year):
    return _accounting_controller.get_balance(int(year))


# noinspection PyUnresolvedReferences
@app.route('/display/balance')
def display_balance():
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_balance.html', bookingperiods=booking_periods)


@app.route('/account/<year>/<costcenter>')
def get_account(year, costcenter):
    return _accounting_controller.get_account(int(year), costcenter)


# noinspection PyUnresolvedReferences
@app.route('/display/account')
def display_account():
    cost_centers = _accounting_controller.get_cost_center_list()
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_account.html',
                           costcenters=cost_centers,
                           bookingperiods=booking_periods)


# noinspection PyUnresolvedReferences
@app.route('/display/scan/<year>')
def display_year(year):
    return render_template('display.html', year=year, filename="")


# noinspection PyUnresolvedReferences
@app.route('/display/scan/<year>/<filename>')
def display_scan(year, filename):
    return render_template('display.html', year=year, filename=filename)


@app.route('/data/<path:filename>')
def download_file(filename):
    return send_from_directory(MAIN_ROOT+"/data", filename, as_attachment=False)


@app.route('/import/<path:filename>')
def import_banking(filename):
    return import_banking_csv_file(MAIN_ROOT+'/data/import/'+filename)


def run_server(accounting_controller: AccountingController, service_charge_controller: ServiceChargeController):
    global _accounting_controller
    global _service_charge_controller
    global app
    _accounting_controller = accounting_controller
    _service_charge_controller = service_charge_controller
    app.run('localhost', 9870)
