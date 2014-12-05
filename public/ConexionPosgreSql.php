<?php
$config = array(
"host" => "localhost",//192.168.10.158
"dbname" => "bd_rrhh",
"username" => "oasisuser",
"password" => "oasispass"//miteleferico123
);
$connection = new Phalcon\Db\Adapter\Pdo\Postgresql($config);
$robot = $connection->fetchAll("SELECT * FROM f_relaborales()");
print_r($robot);
?>