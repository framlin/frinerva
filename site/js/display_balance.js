console.log('starting Javascript')
let __year = ''

function on_load(year){
    __year = year
    console.log("DO THE LOAD: " + year)
}

function clear_node(node) {
    if (node.hasChildNodes()) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

function create_account_section(account) {
    let account_section = document.createElement('div');
    let cost_center = document.createElement('div');
    cost_center.innerHTML = '<h3>' + account['_cost_center'] + '</h3>';
    account_section.setAttribute('id', 'as:'+account['_cost_center']);
    account_section.setAttribute('class', 'account_section');
    account_section.append(cost_center);

    let saldo = document.createElement('div');
    saldo.innerHTML = '<b>Saldo: ' + account['balance'] + ' €</b>';
    account_section.append(saldo);

    let account_table = create_account_table(account);
    account_section.append(account_table);

    return account_section;
}

function load(){
    function reqListener () {
        let balance = this.response;
        console.log(balance)

        let balance_node = document.getElementById("balance");
        clear_node(balance_node)
        let accounts = balance['_accounts'],
            account,
            i,
            account_section,
            total_node = document.getElementById("total");

        total_node.innerHTML = '<b> Saldo: ' + balance['total'] + ' €</b>' ;

        for (i = 0; i < accounts.length; i++) {
            account = accounts[i];
            account_section = create_account_section(account);
            balance_node.append(account_section);
        }
    }

    let booking_periods = document.getElementById("booking_periods_select")
    let year = booking_periods.value

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.responseType = 'json';
    xhr.open("GET", "/balance/"+ year);
    xhr.send();
}

