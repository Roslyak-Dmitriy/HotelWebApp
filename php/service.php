<?php
/**
 * Created by IntelliJ IDEA.
 * User: formu
 * Date: 06.11.2016
 * Time: 22:35
 */

require_once 'host_db.php';
require_once 'hotel.php';

$action = new Hotel();
$params = json_decode(file_get_contents('php://input'));
$command = $params->command;
switch ($command) {
    case "get_all":
        $result = $action->get_all();
        break;
    case "submit_order":
        $result = $action->submit_order($params->order,$params->date);
        break;
    default:
        $result = "no such option.";
}

echo json_encode($result);