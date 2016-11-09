<?php

class Host_DB{

    private static $localHost = ["localhost", "root", "", "hotel_db"];
    private static $serverHost = ["", "", "", ""];

    static function getLocal(){
        return self::$localHost;
    }

    static function getServer(){
        return self::$serverHost;
    }
}