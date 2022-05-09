// ------------------- LOGIN ------------------------ //

function login() {
    if (validate_login() != 0) {
        var data = $('#login_form').serialize();
        // console.log($('#login_form').serialize());
        // ajaxPromise('modules/login/controller/controller_login.php?op=login',
        //     'POST', 'JSON', data)

        $.ajax({
            url: friendlyURL("?module=login&op=login"),
            dataType: "JSON",
            type: "POST",
            data: data,
        }).done(function (result) {
            console.log(result);
            if (result == "error") {
                $("#error_login_password").html('La contraseña no es correcta');
            } else {
                localStorage.setItem("token", result);
                setTimeout(' window.location.href = friendlyURL("?module=home&op=view"); ', 1000);
            }
        }).fail(function (e) {
            console.log(e);
        });
    }
}

function key_login() {
    $("#login_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login_button').on('click', function (e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('l_username').value.length === 0) {
        document.getElementById('error_login_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        document.getElementById('error_login_username').innerHTML = "";
    }

    if (document.getElementById('l_password').value.length === 0) {
        document.getElementById('error_login_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_login_password').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}



// function social_login(param){
//     authService = firebase_config();
//     authService.signInWithPopup(provider_config(param))
//     .then(function(result) {
//         console.log('Hemos autenticado al usuario ', result.user);
//         console.log(result.user.displayName);
//         console.log(result.user.email);
//         console.log(result.user.photoURL);
//         /*
//         if (result) 
//             $.ajax({url: friendlyURL('?module=login&op=social_login')
//         */
//     })
//     .catch(function(error) {
//         console.log('Se ha encontrado un error:', error);
//     });
// }

// function firebase_config(){
//     var config = {
//         apiKey: "AIzaSyD4soE7aA8WvGMh3XNmfJQgn8hDVDuLflU",
//         authDomain: "website-306519.firebaseapp.com",
//         databaseURL: "https://website-306519.firebaseio.com",
//         projectId: "website-306519",
//         storageBucket: "",
//         messagingSenderId: "290934934779"
//     };
//     if(!firebase.apps.length){
//         firebase.initializeApp(config);
//     }else{
//         firebase.app();
//     }
//     return authService = firebase.auth();
// }

// function provider_config(param){
//     if(param === 'google'){
//         var provider = new firebase.auth.GoogleAuthProvider();
//         provider.addScope('email');
//         return provider;
//     }else if(param === 'github'){
//         return provider = new firebase.auth.GithubAuthProvider();
//     }
// }

// ------------------- REGISTER ------------------------ //

function register() {
    console.log('a');
    if (validate_register() != 0) {
        var data = $('#register_form').serialize();
        console.log(data);
        // ajaxPromise('modules/login/controller/controller_login.php?op=register',
        //     'GET', 'JSON', data)
        $.ajax({
            url: friendlyURL("?module=login&op=register"),
            dataType: "JSON",
            type: "POST",
            data: data,


        }).done(function (result) {
            toastr.success('Verification email sended');
            // if ((result == "error_username") || (result == "error_email") || (result == "error_email_username")) {
            //     $("#error_username").empty();
            //     $("#error_email").empty();
            //     if (result == "error_username") {
            //         $("#error_username").html('El username ya esta registrado');
            //     }
            //     if (result == "error_email") {
            //         $("#error_email").html('El email ya esta registrado');
            //     }
            //     if (result == "error_email_username") {
            //         $("#error_username").html('El username ya esta registrado');
            //         $("#error_email").html('El email ya esta registrado');
            //     }
            // } else {
            //     setTimeout(' window.location.href = "index.php?module=login&op=list"; ', 222);
            // }
        }).fail(function (e) {
            console.log(e);
        });
    }
}

function key_register() {
    $("#register_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register_button').on('click', function (e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_username').innerHTML = "El username tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username').innerHTML = "";
        }
    }

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 8) {
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_password').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}


// ------------------- RECOVER PASSWORD ------------------------ //
function load_form_recover_password() {
    $('<form></form>').attr({ 'id': 'email__form', 'method': 'post' }).html('<h2>Recover password</h2>').appendTo('.container');
    $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#email__form');
    $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="email"><b>Email</b></label>' +
        '<input type="text" placeholder="Enter email" id="email" name="email" required>' +
        '<font color="red"><span id="error_email" class="error"></span></font>').appendTo('.form__content');
    $('<div></div>').attr({ 'class': 'button_container' }).html('<input class="button" id="button_email" type="button" value = "Enter"/>').appendTo('.form__content');
    click_recover_password();
}

function click_recover_password() {
    $("#email__form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_email').on('click', function (e) {
        e.preventDefault();
        send_recover_password();
    });
}

function validate_recover_password() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('email').value.length === 0) {
        document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email').value)) {
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email').innerHTML = "";
        }
    }

    if (error == true) {
        return 0;
    }
}

function send_recover_password() {
    if (validate_recover_password() != 0) {
        var data = { email: $('#email').val() };
        $.ajax({
            url: friendlyURL('?module=login&op=send_recover_email'),
            dataType: 'json',
            type: "POST",
            data: data,
        }).done(function (data) {
            toastr.success('Email sended');
        }).fail(function (textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

function load_form_new_password(token) {
    $.ajax({
        url: friendlyURL('?module=login&op=verify_token'),
        dataType: 'json',
        type: "POST",
        data: { token: token },
    }).done(function (data) {
        if (data == "verify") {
            console.log(data);
            $('<form></form>').attr({ 'id': 'new_password__form', 'method': 'post' }).html('<h2>New password</h2>').appendTo('.container');
            $('<div></div>').attr({ 'class': 'form__content' }).appendTo('#new_password__form');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password" name="password" required>' +
                '<font color="red"><span id="error_password" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'form__input' }).html('<label for="password1"><b>Password</b></label>' +
                '<input type="text" placeholder="Enter password" id="password1" name="password1" required>' +
                '<font color="red"><span id="error_password1" class="error"></span></font>').appendTo('.form__content');
            $('<div></div>').attr({ 'class': 'button_container' }).html('<input class="button" id="recover" type="button" value = "Enter"/>').appendTo('.form__content');
            click_new_password(token);
        } else {
            console.log("error");
        }
    }).fail(function (textStatus) {
        if (console && console.log) {
            console.log("La solicitud ha fallado: " + textStatus);
        }
    });
}

function click_new_password(token) {
    $("#new_password__form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_new_password(token);
        }
    });

    $('#recover').on('click', function (e) {
        e.preventDefault();
        send_new_password(token);
    });
}

function validate_new_password() {
    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_password1').innerHTML = "";
        document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('password').value.length < 8) {
            document.getElementById('error_password1').innerHTML = "";
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('password').value !== document.getElementById('password1').value) {
                document.getElementById('error_password').innerHTML = "";
                document.getElementById('error_password1').innerHTML = "Las contraseñas no son iguales";
                error = true;
            } else {
                document.getElementById('error_password').innerHTML = "";
            }
        }
    }
}

function send_new_password(token) {
    if (validate_new_password() != 0) {
        var data = { token: token, password: $('#password').val() };
        console.log(data);
        $.ajax({
            url: friendlyURL("?module=login&op=new_password"),
            type: "POST",
            dataType: "JSON",
            data: data,
        }).done(function (data) {
            toastr.success('New password');
        }).fail(function (textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}

// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    let path = window.location.pathname.split('/');
    // console.log(path[3]);

    // $('.container').empty();
    if (path[3] === 'recover') {
        load_form_new_password(path[4]);
    } else if (path[4] === 'verify') {
        token = path[5].split('%22');
        token = token[1]
        // console.log(token);

        ajaxPromise(friendlyURL("?module=login&op=verify_email"),
            'POST', 'JSON', { token })

    }
    //  else if (path[2] === 'register') {
    //     load_register();
    // } else if (path[2] === 'login') {
    //     load_login();
    // }
}

$(document).ready(function () {
    load_content();
    key_register();
    button_register();
    key_login();
    button_login();


});