function create_account_section(account) {
    let account_section = document.createElement('div');
    let cost_center = document.createElement('div');
    cost_center.innerHTML = '<h3>' + account['_cost_center'] + '</h3>';
    account_section.setAttribute('id', 'as:'+account['_cost_center']);
    account_section.setAttribute('class', 'account_section');
    account_section.append(cost_center);

    let balances = document.createElement('div');
    balances.classList.add('hbox')
    balances.classList.add('balances')


    let saldo = document.createElement('div');
    saldo.innerHTML = '<b>Saldo: ' + format_number(account['balance'], 2) + ' €</b>';
    balances.append(saldo)

    let received = document.createElement('div');
    received.innerHTML = '<b>In: ' + format_number(account['received_payments'], 2) + ' €</b>';
    balances.append(received)

    let outgoing = document.createElement('div');
    outgoing.innerHTML = '<b>Out: ' + format_number(account['outgoing_payments'], 2) + ' €</b>';
    balances.append(outgoing)

    account_section.append(balances);

    function tr_click(event){
        console.log(this.dataset.bookingEntry);
    }
    let account_table = create_account_table(account, tr_click);
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
            total_node = document.getElementById("total"),
            in_node = document.getElementById("in"),
            out_node = document.getElementById("out");

        total_node.innerHTML = '<b> Saldo: ' + format_number(balance['total'], 2) + ' €</b>' ;
        in_node.innerHTML = '<b> In: ' + format_number(balance['received'], 2) + ' €</b>' ;
        out_node.innerHTML = '<b> Out: ' + format_number(balance['outgoing'], 2) + ' €</b>' ;

        for (i = 0; i < accounts.length; i++) {
            account = accounts[i];
            if (account['balance'] !== 0) {
                account_section = create_account_section(account);
                balance_node.append(account_section);
            }
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

