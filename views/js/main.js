/*==================== LOAD MENU ====================*/
function load_menu() {

    $('<li></li>').attr({ 'id': 'liLogin' }).appendTo('#ulMenu');  // header.html linea 75
    $('<li></li>').attr({ 'id': 'liContact' }).appendTo('#ulMenu');

    $('<a></a>').attr({ 'class': 'menu-btn', 'href': friendlyURL("?module=contact&op=view") }).html('Contact Us').appendTo('#liContact');
    $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'home', 'href': friendlyURL("?module=home&op=view"), 'data-tr': 'Home' }).html('Inicio').appendTo('.home-button');
    $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'shop', 'href': friendlyURL("?module=shop&op=view"), 'data-tr': 'Shop' }).html('Tienda').appendTo('.shop-button');

    ajaxPromise('modules/login/controller/controller_login.php?op=data_user', 'POST', 'JSON',
        { token: localStorage.getItem('token') })
        .then(function (data) {
            $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'logout' }).html('Log out').appendTo('#liLogin');
        }).catch(function (e) {
            $('<a></a>').attr({ 'class': 'menu-btn', 'id': 'login', 'href': 'index.php?module=login&op=list' }).html('Login').appendTo('#liLogin');
        });
}

/*==================== CLICK LOGOUT ====================*/
function click_logout() {
    $(document).on('click', '#logout', function () {
        logout();
    });
}

/*==================== LOGOUT ====================*/
function logout() {
    $.ajax({
        url: 'modules/login/controller/controller_login.php?op=logout',
        type: 'POST',
        dataType: 'JSON'
    }).done(function (data) {
        console.log(data);
        localStorage.removeItem('token');
        window.location.href = "index.php?module=home&op=view";
    }).fail(function (e) {
        console.log(e);
    });
}

/*==================== AJAX PROMISE ====================*/
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

/*==================== FRIENDLY URL ====================*/
function friendlyURL(url) {
    // console.log(url);
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
        cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
            link += "/" + aux[1] + "/";
        } else {
            link += "/" + aux[1];
        }
    }
    return "http://localhost/Framework_PHP_OO_MVC" + link;
}

/*==================== LOAD MENU ====================*/
// function load_menu() {
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=home&op=view") + '" class="nav__link">Home</a>').appendTo('.nav__list');
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=shop&op=view") + '" class="nav__link">Shop</a>').appendTo('.nav__list');
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=contact&op=view") + '" class="nav__link">Contact us</a>').appendTo('.nav__list');

//     ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', { token: localStorage.getItem('token') })
//         .then(function (data) {
//             if (data[0].type === 'admin') {
//                 menu_admin();
//             } else if (data[0].type === 'client') {
//                 menu_client();
//             }
//         }).catch(function () {
//             $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=login&op=view") + '" class="nav__link">Log in</a>').appendTo('.nav__list');
//             $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
//         });
// }

/*==================== MENUS ====================*/
// function menu_admin() {
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=crud&op=view") + '" class="nav__link">Crud</a>').appendTo('.nav__list');
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('.nav__list');
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
// }

// function menu_client() {
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('.nav__list');
//     $('<li></li>').attr({ 'class': 'nav__item' }).html('<a href="' + friendlyURL("?module=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
// }

// /*==================== CLICK LOGOUT ====================*/
// function click_logout() {
//     $(document).on('click', '#logout', function () {
//         logout();
//     });
// }

// /*==================== LOGOUT ====================*/
// function logout() {
//     $.ajax({
//         url: friendlyURL('?module=login&op=logout'),
//         type: 'POST',
//         dataType: 'JSON'
//     }).done(function (data) {
//         localStorage.removeItem('token');
//         window.location.href = friendlyURL("?module=home&op=view");
//     }).fail(function () {
//         console.log('Something has occured');
//     });
// }

$(document).ready(function () {
    load_menu();
    click_logout();
});