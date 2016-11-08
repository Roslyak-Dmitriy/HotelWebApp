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
    public static function submit_order($order,$date)
    {
        $host = Host::getLocal();
        error_reporting(0);
        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

       // $dt = date('Y-m-d H:i:s');
        $query = "SELECT price FROM items WHERE id='$order->item_id'";
        $result = $connection->query($query);
        $price = -1;
        if ($result->num_rows > 0) {
            $price = $result->fetch_row();
        }
        if($price==-1) return null;
        else $price=$price[0];
        $query = "INSERT INTO orders SET name1='$order->name',email='$order->user_email',item_id='$order->item_id',date_in='$date->in',date_out='$date->out',price='$price'";

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