let active_sub_menu_entry = null;

function on_menu_selection(event) {
    if (active_sub_menu_entry) {
        active_sub_menu_entry.classList.remove('active');
    }
    active_sub_menu_entry = event.target.parentNode;
    active_sub_menu_entry.classList.add('active');
}

function on_load(){
    document.querySelector("body").onclick = function on_click(event) {
        if (event.target.className === 'sub_menu_entry') {
            on_menu_selection(event);
        }
    }
}