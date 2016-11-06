<?php
/**
 * Created by IntelliJ IDEA.
 * User: formu
 * Date: 06.11.2016
 * Time: 22:35
 */

require_once 'host.php';
require_once 'hotel.php';

$host = Host::getLocal();

$action = new hotel();
$params = json_decode(file_get_contents('php://input'));
$command = $params->command;
switch ($command) {
    case "get_all":
        $result = $action->get_all();
        break;
    default:
        $result = "no such option.";
}

echo json_encode($result);