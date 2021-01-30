console.log('starting Javascript')
let __year = ''

function on_load(year){
    __year = year
    console.log("DO THE LOAD: " + year)
}

function reload(){
    let file_search = document.getElementById('file_input')
    let fn = file_search.files[0].name;
    let url_list = window.location.href.split('/')
    let url_prefix = [url_list[0], url_list[1], url_list[2], url_list[3], url_list[4]].join('/')
    let redirect_url = url_prefix + '/' + __year + '/' + fn

    window.location.href = redirect_url
}
