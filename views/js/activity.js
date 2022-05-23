function protecturl() {

    token = localStorage.getItem('token');
    token = token.split('"');
    token = token[1]

    ajaxPromise(friendlyURL("?module=login&op=control_user"), 'POST', 'JSON', { token })

        .then(function (data) {
            // console.log(data);
            if ((data == 'Invalid Signature') || (data == 'invalid_user')) {
                toastr.warning('Error usuario');
                setInterval(function () { logout() }, 3000);
            }
        }).catch(function (e) {
            // console.log(e);
            toastr.warning('Error usuario');
            setInterval(function () { logout() }, 3000);
        });
}


function actividad() {

    ajaxPromise(friendlyURL("?module=login&op=actividad"), 'POST')

        .then(function (data) {
            console.log(data);
            if (data == "inactivo") {
                toastr.warning('Se va a cerrar la sesión por inactividad');
                setInterval(function () { logout() }, 3000);
            }
        }).catch(function (e) {
            console.log(e);
        });
}

function refresh_token() {

    token = localStorage.getItem('token');
    token = token.split('"');
    token = token[1]

    ajaxPromise(friendlyURL("?module=login&op=refresh_token"), 'POST', 'JSON', { token })
        .then(function (data) {
            // console.log(data);
            data = '"' + data + '"';
            localStorage.setItem("token", data);
        }).catch(function (e) {
            console.log(e);
        });
}

function refresh_cookie() {
    ajaxPromise(friendlyURL("?module=login&op=refresh_cookie"), 'POST')
        .then(function (data) {
            // console.log(data);
        }).catch(function (e) {
            console.log(e);
        });
}

$(document).ready(function () {
    if (localStorage.getItem('token')) {

        protecturl();

        setInterval(function () {
            actividad();
        }, 300000);


        setInterval(function () {
            refresh_token();
            refresh_cookie();
        }, 5000);
    }
});
