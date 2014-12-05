<?php

use Phalcon\DI\FactoryDefault;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Url as UrlResolver;
//use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Db\Adapter\Pdo\PostgreSQL as DbAdapter;
//use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Mvc\Model\Metadata\Memory as MetaDataAdapter;
use Phalcon\Session\Adapter\Files as SessionAdapter;

/**
 * The FactoryDefault Dependency Injector automatically register the right services providing a full stack framework
 */
$di = new FactoryDefault();

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->set('url', function () use ($config) {
    $url = new UrlResolver();
    $url->setBaseUri($config->application->baseUri);

    return $url;
}, true);

/**
 * Setting up the view component
 */
$di->set('view', function () use ($config) {

    $view = new View();

    $view->setViewsDir($config->application->viewsDir);

    $view->registerEngines(array(
        /* '.volt' => function ($view, $di) use ($config) {

          $volt = new VoltEngine($view, $di);

          $volt->setOptions(array(
          'compiledPath' => $config->application->cacheDir,
          'compiledSeparator' => '_'
          ));

          return $volt;
          }, */
        '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
    ));

    return $view;
}, true);

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->set('db', function () use ($config) {
    return new DbAdapter(array(
        'host' => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname' => $config->database->dbname,
      //  'charset' => $config->database->charset
    ));
});
$di->set('sigec', function () {
    return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
        'host' => 'localhost',
        'username' => 'root',
        'password' => '',
        'dbname' => 'paperwork'
    ));
});
$di->set('oracle', function () {
    return new \Phalcon\Db\Adapter\Pdo\Oracle(array(
        'username' => 'CONTRATACION',
        'password' => 'CONTRATACION',
        'dbname' => '(DESCRIPTION=
        (ADDRESS=
        (PROTOCOL=TCP)
        (HOST=172.16.0.11)
        (PORT=1521)
        )
        (CONNECT_DATA=
        (SERVER=dedicated)
        (SERVICE_NAME=central.oopp.gob.bo)
        )
        )'           
    ));
});
/**
 * If the configuration specify the use of metadata adapter use it or use memory otherwise
 */
$di->set('modelsMetadata', function () {
    return new MetaDataAdapter();
});

/**
 * Start the session the first time some component request the session service
 */
$di->set('session', function () {
    $session = new SessionAdapter();
    $session->start();

    return $session;
});

//Register the flash service with custom CSS classes
$di->set('flash', function() {
    $flash = new \Phalcon\Flash\Direct(array(
        'error' => 'alert alert-error',
        'success' => 'alert alert-success',
        'notice' => 'alert alert-info',
    ));
    return $flash;
});
//Register the flash service with custom CSS classes
$di->set('flashSession', function() {
    $flash = new \Phalcon\Flash\Session(array(
        'error' => 'alert alert-block alert-danger  alert-block fade in',
        'success' => 'alert alert-success  alert-block fade in',
        'notice' => 'alert alert-info  alert-block fade in',
    ));
    return $flash;
});
