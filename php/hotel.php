<?php
require_once 'host.php';

class Hotel
{
    public static function get_all()
    {
        $host = Host::getLocal();
        error_reporting(0);
        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $query = "SELECT * FROM items";

        $userData = [];
        $result = $connection->query($query);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $userData[] = $row;
            }
        }
        mysqli_close($connection);
        if (count($userData)) {
            return $userData;
        } else {
            return null;
        }
    }

}