let active_sub_menu_entry = null;



window.addEventListener('DOMContentLoaded', () => {

    // let file_picker = document.getElementById("file_picker");
    // file_picker.addEventListener("change", handleFiles, false);
    // function handleFiles() {
    //     let file = this.files[0];
    //     import_controller.import_file(file.path);
    // }

    let body = document.getElementsByTagName("body")[0];
    body.addEventListener("onload", (event) => {
        event.preventDefault();
        on_load();
    })


    // <body onLoad="on_load();">
});
function on_menu_selection(event) {
    if (active_sub_menu_entry) {
        active_sub_menu_entry.classList.remove('active');
    }
    active_sub_menu_entry = event.target.parentNode;
    active_sub_menu_entry.classList.add('active');
}

function on_load(){
    debugger
    document.querySelector("body").onclick = function on_click(event) {
        if (event.target.className === 'sub_menu_entry') {
            on_menu_selection(event);
        }
    }
}