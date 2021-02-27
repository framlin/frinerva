function BookingEntryForm() {
    this.dom_object = document.getElementById('booking_entry_form');
    this.inputs = this.dom_object.getElementsByTagName('input');
    this.buttons = this.dom_object.getElementsByTagName('button');
    this.field_list = null;
    this._is_created = false;
    this._created_entry = null;
};

BookingEntryForm.prototype.close = function close() {
    this.dom_object.classList.add('collapsed');
};

BookingEntryForm.prototype.clear = function clear() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.value = "";
    }
};

BookingEntryForm.prototype.update_entry = function update_entry(booking_entry, is_new) {

    for (let field in this.field_list) {
        booking_entry[field] = document.getElementById(this.field_list[field]).value;
    }

    booking_entry['_scs_type'] = this.scs_type;
    booking_entry['_cost_center'] = this.cost_center;
    if (is_new) {
        booking_entry['_new'] = true;
    } else {
        booking_entry['_dirty'] = true;
    }

}

BookingEntryForm.prototype.save =  function save(){
    if (!this._is_created) {
        this.update_entry(this.dom_object.booking_entry, false);
        update_booking_entry(this.dom_object.booking_entry);
    } else {
        this.update_entry(this._created_entry, true);
        put_booking_entry(this._created_entry)
    }
    this.close();
};

BookingEntryForm.prototype.reset = function reset() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.setAttribute('readonly', true);
    }

    for (let i = 0; i < this.buttons.length; i += 1) {
        let button = this.buttons[i];
        button.removeAttribute('disabled');
    }
}

BookingEntryForm.prototype.open_inputs =  function open_inputs() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.removeAttribute('readonly');
    }
}

BookingEntryForm.prototype.edit = function edit() {
    this.open_inputs();

    let delete_button = document.getElementById("booking_entry_form_del");
    delete_button.setAttribute('disabled', "true");

    let create_button = document.getElementById("booking_entry_form_create");
    create_button.setAttribute('disabled', "true");
}

BookingEntryForm.prototype.create = function create() {
    this.clear();
    this.open_inputs();
    let booking_entry = {};
    for(let field in this.field_list){
        booking_entry[field] = "";
    }

    booking_entry['_id']= "";
    booking_entry['_scs_type'] =  this.scs_type;
    booking_entry['_cost_center'] = this.cost_center;

    this.fill_fields(booking_entry);
    this._is_created = true;
    this._created_entry = booking_entry;

};

BookingEntryForm.prototype.del = function del(){
    delete_booking_entry(this.dom_object.booking_entry);
    this.close();
};

BookingEntryForm.prototype.cancel = function cancel(){
    this.close();
};

BookingEntryForm.prototype.open = function open(left, top, booking_entry, dataset, field_list) {
    this.scs_type = booking_entry['_scs_type'];
    this.field_list = field_list;
    this.cost_center = dataset['costCenter']
    this._is_created = false;

    this.reset();

    this.dom_object.classList.remove('collapsed');

    for (let field in field_list) {
        document.getElementById(field).classList.remove('collapsed')
    }

    this.dom_object.style.setProperty('top', top + 'px');
    this.dom_object.style.setProperty('left', left + 'px');
    this.dom_object.booking_entry = booking_entry

    this.fill_fields(booking_entry, field_list);

};


BookingEntryForm.prototype.fill_fields = function fill_fields(booking_entry, field_list) {
    for (let field in field_list) {
        document.getElementById(field_list[field]).value = booking_entry[field];
    }
    document.getElementById("id_label").innerHTML = booking_entry['_id'].substr(0,30);
};