<?php
require_once 'host_db.php';
require_once '../swiftmailer/swift_required.php';
class Hotel
{
    public static function get_all()
    {
        $host_db = Host_DB::getLocal();
        error_reporting(0);
        $connection = mysqli_connect($host_db[0], $host_db[1], $host_db[2], $host_db[3]) or die (json_encode("Error " . mysqli_error($connection)));
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
        $host_db = Host_DB::getLocal();
        error_reporting(0);
        $connection = mysqli_connect($host_db[0], $host_db[1], $host_db[2], $host_db[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

       // $dt = date('Y-m-d H:i:s');
        $query = "SELECT price FROM items WHERE id='$order->item_id'";
        $result = $connection->query($query);
        $price = -1;
        if ($result->num_rows > 0) {
            $price = $result->fetch_row();
        }
        if($price==-1) return 'no matching item'; else $price=$price[0];

        $dt_in = new DateTime($date->in);
        $dt_out = new DateTime($date->out);
        $interval = $dt_in->diff($dt_out);
        $price*=$interval->days;
        $dt_in=date_format($dt_in,'Y-m-d');
        $dt_out=date_format($dt_out,'Y-m-d');
        $query = "INSERT INTO orders SET name1='$order->name',email='$order->user_email',item_id='$order->item_id',date_in='$dt_in',date_out='$dt_out',price='$price'";

        $connection->query($query);
        mysqli_close($connection);
        
        $transport = Swift_SmtpTransport::newInstance('localhost', 25);//localhost
        $mailer = Swift_Mailer::newInstance($transport);

        $message = Swift_Message::newInstance('HotelWebApp')
            ->setFrom(array('hotelwebapp@localhost' => 'John Doe'))
            ->addTo($order->user_email, $order->name)//'test@localhost'
            ->setBody('Here is the message itself')
            ->attach(Swift_Attachment::fromPath('../img/No_image_available.svg'))
        ;
        $mailer->send($message);
        return 'success';
    }
}