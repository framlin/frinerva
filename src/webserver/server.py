from flask import Flask, send_from_directory, redirect, url_for, render_template
from utils.utils import import_banking_csv_file

MAIN_ROOT = '../'

app = Flask('Frinerva',
            static_folder=MAIN_ROOT+"site",
            static_url_path='/site',
            template_folder=MAIN_ROOT+'site/templates')


@app.route('/')
def hello_world():
    return redirect(url_for('static', filename='/html/pdftest.html'))


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
    return send_from_directory(MAIN_ROOT+"data", filename, as_attachment=False)


@app.route('/import/<path:filename>')
def import_banking(filename):
    return import_banking_csv_file(MAIN_ROOT+'/data/import/'+filename)


def run_server():
    global app
    app.run('localhost', 9870)
