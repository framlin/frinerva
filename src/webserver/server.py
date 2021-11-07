from flask import Flask, send_from_directory, redirect, url_for, render_template, request

from accounting.importer import import_banking_csv_file
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


@app.route('/service_charges_forward/<year>', methods=['POST'])
def forward_service_charges(year):
    if request.method == 'POST':
        return _service_charge_controller.forward(year, request.json)


@app.route('/service-charges-transfer/<year>', methods=['POST'])
def transfer_service_charges(year):
    if request.method == 'POST':
        return _service_charge_controller.transfer(year, request.json)


@app.route('/service-charges-print/<year>', methods=['GET'])
def print_service_charge_statement(year: str):
    if request.method == 'GET':
        return _service_charge_controller.print(year)


# noinspection PyUnresolvedReferences
@app.route('/service-charges.html')
def display_service_charges():
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_service_charges.html', bookingperiods=booking_periods)


@app.route('/service-charges/<year>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def service_charges(year):
    if request.method == 'GET':
        return _service_charge_controller.get_service_charge_statment(year)

    elif request.method == 'POST':
        print(request.json)
        return _service_charge_controller.update_scs_booking_entry(year, request.json)

    elif request.method == 'PUT':
        print(request.json)
        return _service_charge_controller.add_scs_booking_entry(year, request.json)

    elif request.method == 'DELETE':
        print(request.json)
        return _service_charge_controller.remove_scs_booking_entry(year, request.json)


@app.route('/balance/<year>', methods=['POST', 'PUT', 'GET', 'DELETE'])
def balance(year):
    if request.method == 'GET':
        # return _service_charge_controller.get_service_charge_statment(year)
        return _accounting_controller.get_balance(int(year))

    elif request.method == 'POST':
        print(request.json)
        return _accounting_controller.update_booking_entry(int(year), request.json)
        # return _accounting_controller.update_booking_entry(year, request.json)

    elif request.method == 'PUT':
        print(request.json)
        return _accounting_controller.get_balance(int(year))
        # return _service_charge_controller.add_scs_booking_entry(year, request.json)

    elif request.method == 'DELETE':
        print(request.json)
        return _accounting_controller.get_balance(int(year))
        # return _service_charge_controller.remove_scs_booking_entry(year, request.json)


# noinspection PyUnresolvedReferences
@app.route('/balance.html')
def display_balance():
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_balance.html', bookingperiods=booking_periods)


@app.route('/account/<year>/<costcenter>')
def get_account(year, costcenter):
    return _accounting_controller.get_account(int(year), costcenter)


# noinspection PyUnresolvedReferences
@app.route('/account.html')
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
