from flask import Flask, send_from_directory, redirect, url_for, render_template
from utils.utils import import_banking_csv_file

from middleware.accounting_controller import AccountingController

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


@app.route('/balance/<year>')
def get_balance(year):
    return _accounting_controller.get_balance(int(year))


@app.route('/account/<year>/<costcenter>')
def get_account(year, costcenter):
    return _accounting_controller.get_account(int(year), costcenter)


# noinspection PyUnresolvedReferences
@app.route('/display/balance')
def display_balance():
    booking_periods = _accounting_controller.get_booking_periods()
    return render_template('display_balance.html', bookingperiods=booking_periods)


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


def run_server(accounting_controller: AccountingController):
    global _accounting_controller
    global app
    _accounting_controller = accounting_controller
    app.run('localhost', 9870)
