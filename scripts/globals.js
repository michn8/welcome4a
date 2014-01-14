


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



function Showloading(showOrHide) {
   
    setTimeout(function () {
        $.mobile.loading(showOrHide);
    }, 1);
}

function formatDateJson(pDate) {

    var dateVal = pDate;
    var date = new Date(parseFloat(dateVal.substr(6)));
    var dateString =(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    return dateString;

}