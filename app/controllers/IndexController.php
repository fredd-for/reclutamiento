<?php

class IndexController extends ControllerBase {

    public function initialize() {
        parent::initialize();
    }

    public function indexAction() {

        $this->view->setVar('usuario', $this->_user);
        $resul = Ppostulantes::findFirstByid($this->_user->id);
        $this->view->setVar('postulante', $resul);
    }

    

}
