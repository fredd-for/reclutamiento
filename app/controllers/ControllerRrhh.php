<?php

use Phalcon\Mvc\Controller;
use Phalcon\Events\Event;

class ControllerRrhh extends Controller {

    protected $_user;
    protected $_con;

    public function beforeExecuteRoute() {
        //Check whether the "auth" variable exists in session to define the active role
        $auth = $this->session->get('auth');
        if (!$auth) {
            header('Location: /login');
        } 
        return true;
    }

    protected function initialize() {
        $auth = $this->session->get('auth');
        if (!isset($auth['id'])) {
            $this->response->redirect('/login');
            //parent::initialize();
        } else {

            //obtenemos la instancia del usuario
            $user_id = $auth['id'];
            $this->_user = Ppostulantes::findFirst("id = '$user_id'");
            //Prepend the application name to the title
            $this->tag->setTitle('Postulación - MI TELEFERICO');
          
          
            //menu
            $this->menu($this->_user->nivel);
            $this->view->setVar('user', $this->_user);
        }
    }

    protected function usuario() {
        $auth = $this->session->get('cite');
        if ($auth) {
            $user_id = $auth['id'];
            $this->_user = Ppostulantes::findFirst("id = '$user_id'");
            return $this->_user;
        } else {
            return false;
        }
    }

    protected function forward($uri) {
        $uriParts = explode('/', $uri);
        return $this->dispatcher->forward(
                        array(
                            'controller' => $uriParts[0],
                            'action' => $uriParts[1]
                        )
        );
    }

    //menu de acuerdo al nivel
    protected function menu($nivel) {
        $mMenu = new menus();
        $menus = $mMenu->listaNivel($nivel);
        $this->view->setVar('menus', $menus);
    }

    /* protected function menu($nivel) {

      $phql= "SELECT m.id, m.menu, m.descripcion, m.controlador,s.id as id_submenu  ,s.submenu,s.accion,s.descripcion,m.icon
      FROM menus m
      INNER JOIN nivelmenu AS n ON (m.id=n.id_menu )
      INNER JOIN submenus AS s ON (m.id=s.id_menu)
      WHERE n.id_nivel='$nivel'
      AND s.habilitado='1'
      ORDER BY m.index";
      $query = $this->modelsManager->createQuery($phql);
      $menus = $query->execute();
      $this->view->setVar('menus', $menus);
      } */
}
