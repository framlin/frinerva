let service_charges = null;
let booking_entry_form = null;

function create_scs_table(data, data_index, elem_id, callbacks) {
        let scs_data = data[data_index];
        let scs_node = document.getElementById(elem_id)
        clear_node(scs_node)
        scs_node.append(create_account_table(scs_data['_accounts'][0], callbacks['tr_click']))
}

function get_booking_entry(scs_type, dataset) {
    let scs_balance =  service_charges[scs_type];
    for (let i = 0; i < scs_balance['_accounts'].length; i++ ){
        let acc = scs_balance['_accounts'][i];
        let cost_center = acc['_cost_center'];
        if (cost_center === dataset.costCenter) {
            for (let bk = 0; bk < acc['_bookings'].length; bk++) {
                let booking = acc['_bookings'][bk]
                if (booking['_id'] === dataset.id) {
                    booking['_scs_type'] = scs_type
                    return booking;
                }
            }
        }
    }
}


function get_tr_click_callback(scs_type){
    return function tr_click(){
        let left = this.parentElement.offsetLeft + this.offsetLeft;
        let top = this.parentElement.offsetTop + this.offsetTop;
        booking_entry_form = new BookingEntryForm(service_charges);
        booking_entry_form.show(left, top, scs_type, this.dataset);
        console.log(scs_type, get_booking_entry(scs_type, this.dataset));
    }
}

function show_scs_section(service_charges) {
        create_scs_table(service_charges, 'HOUSE', 'scs_house', {'tr_click': get_tr_click_callback('HOUSE')})
        create_scs_table(service_charges, 'DWELLING', 'scs_dwelling', {'tr_click': get_tr_click_callback('DWELLING')})
        create_scs_table(service_charges, 'RENTAL', 'scs_rental', {'tr_click': get_tr_click_callback('RENTAL')})
}

function getLoadReqListener(year) {
    return function loadReqListener () {
        service_charges = this.response;
        service_charges['year'] = year;
        console.log(service_charges)
        show_scs_section(service_charges);
    }
}

function getSaveRequestListener(year) {
    return function saveReqListener  () {
        if (this.readyState === 4 && this.status === 200) {
            // let json = JSON.parse(xhr.responseText);
            service_charges = this.response;
            service_charges['year'] = year;
            console.log(service_charges);
            show_scs_section(service_charges);
        }
    }
}

function load(){
    let booking_periods = document.getElementById("booking_periods_select")
    let year = booking_periods.value

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", getLoadReqListener(year));
    xhr.responseType = 'json';
    xhr.open("GET", "/service-charges/"+ year);
    xhr.send();
}

function get_year() {
    let booking_periods = document.getElementById("booking_periods_select")
    let year = booking_periods.value
    return year;
}


function send_write_request(method, data) {
    console.log(data)
    let year = get_year();

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener("load", getSaveRequestListener(year));
    xhr.open(method, "/service-charges/"+ year);
    xhr.setRequestHeader("Content-Type", "application/json");

    let json_data = JSON.stringify(data);
    xhr.send(json_data);
}

function update_scs_booking_entry(scs_booking_entry){
    send_write_request("POST", scs_booking_entry)
}

function put_scs_booking_entry(scs_booking_entry) {
    send_write_request("PUT", scs_booking_entry)
}


function delete_scs_booking_entry(scs_booking_entry) {
    send_write_request("DELETE", scs_booking_entry)
}