<?php

class LoginController extends \Phalcon\Mvc\Controller {

    //login  
    public function indexAction() {
        $auth = $this->session->get('auth');
        if ($auth) {
            $this->response->redirect('/');
        }
        $this->view->setMainView('login');
        $this->view->setLayout('login');

        if ($this->request->isPost()) {
            $correo = $this->request->getPost('username');
            $password = $this->request->getPost('password');
            //$password = hash_hmac('sha256', $password, '2, 4, 6, 7, 9, 15, 20, 23, 25, 30');                           
            $user = Ppostulantes::findFirst(
                            array(
                                "correo = :usuario: AND password = :password: AND baja_logica= :estado:",
                                "bind" => array('usuario' => $correo, 'password' => $password, 'estado' => 1)
            ));
            if ($user != false) {         
                $user->logins = $user->logins + 1;
                //$user->lastlogin = time();
                $user->save();
                $this->_registerSession($user);
                $this->flashSession->success('Bienvenido <i>' . $user->nombre . '</i>');
                $this->response->redirect('/ppostulantes');
            }
            $this->flashSession->error('<b>Acceso denegado!</b> Usuario/contraseña incorrectos');
        }     
    }

    public function passwordAction() {
         $this->view->setMainView('login');
        $this->view->setLayout('login');
        if ($this->request->isPost()) {
            $email = $this->request->getPost('email');                        
            //buscamos el mail
            $user = usuarios::findFirst(
                            array(
                                "email = :email: AND habilitado= :estado:",
                                "bind" => array('email' => $email, 'estado' => 1)
            ));
            if ($user != false) {
                //acutalizamos la cantidad de ingresos
                $user->logins = $user->logins + 1;
                $user->lastlogin = time();
                $user->save();
                $this->_registerSession($user);
                $this->flashSession->success('Bienvenido <i>' . $user->nombre . '</i>');
                $this->response->redirect('/dashboard');
            }
            $this->flashSession->error('Email inexsitente en el sistema, o usuario No habilitado');
        }
    }
//registro de la session
    private function _registerSession($user) {
        $this->session->set('auth', array(
            'id' => $user->id,
            'name' => $user->nombre,
            'nombre' => $user->app,
            'apm' => $user->apm,
            'sexo' => $user->sexo,
        ));
    }    
    public function exitAction() {
        $this->session->remove('auth');
        $this->flash->success('Goodbye!');
        $this->response->redirect('/login');
    }

    public function registrarAction() {
        // $auth = $this->session->get('auth');
        // if ($auth) {
        //     $this->response->redirect('/');
        // }
        if ($this->request->isPost()) {
            $resul = new Ppostulantes();
            $resul->nombre = strtoupper($this->request->getPost('nombre'));
            $resul->app = strtoupper($this->request->getPost('app'));
            $resul->apm = strtoupper($this->request->getPost('apm'));
            $resul->sexo = $this->request->getPost('sexo');
            $resul->ci = $this->request->getPost('ci');
            $resul->expedido = $this->request->getPost('expedido');
            $resul->fecha_nac = date("Y-m-d",strtotime($this->request->getPost('fecha_nac')));
            $resul->nacionalidad = strtoupper($this->request->getPost('nacionalidad'));
            $resul->estado_civil = strtoupper($this->request->getPost('estado_civil'));
            $resul->direccion = strtoupper($this->request->getPost('direccion'));
            $resul->telefono = $this->request->getPost('telefono');
            $resul->celular = $this->request->getPost('celular');
            $resul->correo = $this->request->getPost('correo');
            $resul->fax = $this->request->getPost('fax');
            $resul->casilla = $this->request->getPost('casilla');
            $resul->password = $this->_generarPass();
            $resul->lugar_postulacion = $this->request->getPost('lugar_postulacion');
            $resul->fecha_registro = date("Y-m-d H:i:s");
            $resul->estado = 0;
            $resul->libreta_militar = $this->request->getPost('libreta_militar');
            $resul->empadronamiento = $this->request->getPost('empadronamiento');
            $resul->parentesco = $this->request->getPost('parentesco');
            $resul->nivel = 2;
            $resul->baja_logica = 1;
            if ($resul->save()) {
                $resul2 = new Pposseguimientos();
                $resul2->postulante_id=$resul->id;
                $resul2->seguimiento_id = $this->request->getPost('seguimiento_id');
                $resul2->estado = 0;
                $resul2->baja_logica = 1;
                $resul2->save();
                $this->flashSession->success("<strong>Exito: </strong>Registro guardado correctamente.Revise su correo electronico, se le envio la contraseña para postularse. ");
            }else{
                $this->flashSession->error("<strong>Error: </strong>no se guardo el registro...");
            }
            $this->response->redirect('/');
        }
        $this->view->setMainView('registrar');
        $this->view->setLayout('registrar');
        $model = new Ppostulantes();
        $resul= $model->cargosConvocatoria();
        $this->view->setVar('cargos', $resul);
        // $this->view->setVar('pass', $pass);
    }


    private function _generarPass()
    {
        $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $pass = "";
        for($i=0;$i<10;$i++) {
            $pass .= substr($str,rand(0,62),1);
        }
        return $pass;
    }

}
