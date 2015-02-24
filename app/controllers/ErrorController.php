<?php

use Phalcon\Mvc\Controller;
use Phalcon\Events\Event;
class ErrorController extends Controller
{
    public function show404Action()
    {
        $this->response->setStatusCode(404, 'Not Found');
       // $this->view->pick('404/404');
    }
}