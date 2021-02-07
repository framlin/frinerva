console.log('starting Javascript')
let __year = ''

function on_load(year){
    __year = year
    console.log("DO THE LOAD: " + year)
}

function load(){
    function reqListener () {
        let booking_entries = document.getElementById("booking_entries");
        let account = this.response;
        let account_table = create_account_table(account);
        console.log(account)
        if (booking_entries.hasChildNodes()) {
            while (booking_entries.firstChild) {
                booking_entries.removeChild(booking_entries.firstChild);
            }
        }

        booking_entries.append(account_table);

        let balance = document.getElementById('balance');
        balance.innerHTML = '<b>Saldo: ' + account['balance'] + ' €</b>';
    }

    let booking_periods = document.getElementById("booking_periods_select")
    let year = booking_periods.value

    let cost_centers = document.getElementById("cost_center_select")
    let cost_center = cost_centers.value
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.responseType = 'json';
    xhr.open("GET", "/account/"+ year + "/" + cost_center);
    xhr.send();
}
