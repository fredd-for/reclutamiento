<?php

return new \Phalcon\Config(array(
    'database' => array(
       'adapter'     => 'Postgresql',
       /*  'host'        => 'localhost',
        'username'    => 'postgres',
        'password'    => 'r0salinda',
        'dbname'      => 'bd_rrhh',
       */
        'host'        => 'localhost',
        'username'    => 'user_rrhh',
        'password'    => 'pass_rrhh',
        'dbname'      => 'bd_rrhh_prueba',
        
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
        'phpexcel'    => __DIR__ . '/../../app/libs/phpexcel178/',
        'phpmailer'    => __DIR__ . '/../../app/libs/phpmailer/',
        'coolphpcaptcha'    => __DIR__ . '/../../app/libs/cool-php-captcha/',
        'baseUri'        => '',
    )
));
