<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/Framework_PHP_OO_MVC/';
include($path . "modules/home/model/DAO_home.php");

// $homeQuery = new QuerysHomePage();
if (isset($_SESSION["tiempo"])) {
    $_SESSION["tiempo"] = time(); //Devuelve la fecha actual
}

switch ($_GET['op']) {
    case 'list';
        include('modules/home/view/home.html');
        break;

    case 'HomeBrands';

        $daocars = new DAOhome();
        $rdo = $daocars->selectBrand();
        echo json_encode($rdo);

        break;


    case 'HomeCategories';

        $daocars = new DAOhome();
        $rdo = $daocars->selectCategories();
        echo json_encode($rdo);

        break;

    case 'HomeTypes';

        $daocars = new DAOhome();
        $rdo = $daocars->selectTypes();
        echo json_encode($rdo);

        break;


}// end_switch