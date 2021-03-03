let booking_entry_form = null;
let balance = null;
let field_list = {
    '_amount':"amount_field",
    '_name':"name_field",
    '_subject':"subject_field",
    '_date':"date_field",
    '_booking_code':"booking_code_field",
}

function get_transfer_callback(account) {
    return function transfer() {
        xhr_write('POST', account, "/service-charges-transfer/"+ get_year(), function(){
            //NOP
        });
    }

}

function create_account_section(account) {
    let account_section = document.createElement('div');
    let cost_center = document.createElement('div');
    cost_center.innerHTML = '<h3>' + account['_cost_center'] + '</h3>';

    if ((account['_cost_center'] == 'SERVICE_CHARGES') || (account['_cost_center'] == 'HOUSE')){
        let cost_center_button = document.createElement('button')
        cost_center_button.innerHTML = 'transfer';
        cost_center_button.setAttribute("id", "b_transfer");
        cost_center_button.addEventListener('click', get_transfer_callback(account))
        cost_center.append(cost_center_button);
        cost_center.classList.add('hbox');
    }

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
        console.log(this.dataset);
        let left = this.parentElement.offsetLeft + this.offsetLeft;
        let top = this.parentElement.offsetTop + this.offsetTop;
        booking_entry_form = new BookingEntryForm();
        booking_entry_form.open(left, top, get_booking_entry(this.dataset), this.dataset, field_list);
    }

    let account_table = create_account_table(account, tr_click, {
        '_booking_code': 1,
        '_date':1,
        '_amount':1,
        '_name':1
    });
    account_section.append(account_table);

    return account_section;
}

function get_booking_entry(dataset) {
    for (let i = 0; i < balance['_accounts'].length; i++ ){
        let acc = balance['_accounts'][i];
        let cost_center = acc['_cost_center'];
        if (cost_center === dataset.costCenter) {
            for (let bk = 0; bk < acc['_bookings'].length; bk++) {
                let booking = acc['_bookings'][bk]
                if (booking['_id'] === dataset.id) {
                    return booking;
                }
            }
        }
    }
}



function reqListener () {
    balance = this.response;
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

function load(){
    let year = get_year();
    xhr_read("/balance/"+ year, reqListener);
}

function get_year() {
    let booking_periods = document.getElementById("booking_periods_select")
    return booking_periods.value
}

function send_write_request(method, data) {
    let year = get_year();
    xhr_write(method, data, "/balance/"+ year, reqListener)
}

function update_booking_entry(booking_entry){
    send_write_request("POST", booking_entry)
}

function put_booking_entry(booking_entry) {
    send_write_request("PUT", booking_entry)
}


function delete_booking_entry(booking_entry) {
    send_write_request("DELETE", booking_entry)
}
