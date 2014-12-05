<?php

return new \Phalcon\Config(array(
    'database' => array(
        'adapter'     => 'Postgresql',
        'host'        => '192.168.10.158',
        'username'    => 'postgres',
        'password'    => 'miteleferico123',
        'dbname'      => 'bd_rrhh',
    ),
    'application' => array(
        'controllersDir' => __DIR__ . '/../../app/controllers/',
        'modelsDir'      => __DIR__ . '/../../app/models/',
        'viewsDir'       => __DIR__ . '/../../app/views/',
        'pluginsDir'     => __DIR__ . '/../../app/plugins/',
        'libraryDir'     => __DIR__ . '/../../app/library/',
        'cacheDir'       => __DIR__ . '/../../app/cache/',
        'baseUri'        => '   ',
        // Cargar librería fpdf
        'fpdf'        => __DIR__ . '/../../app/libs/fpdf/',
        //'t_pdf'        => __DIR__ . '/../../app/libs/fpdf/',
        'baseUri'        => '',
    )

));
