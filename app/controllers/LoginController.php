<?php
 require_once('../app/libs/phpmailer/class.phpmailer.php');
 require_once('../app/libs/phpmailer/class.smtp.php');
// require_once '../app/phpmailer/class.phpmailer.php';
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
            $x=$this->session->get("captcha");
        if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha'])) != $_SESSION['captcha']) {
            $this->flashSession->error("<strong>Error: </strong>Codigo captcha invalido");
        } else {
            $email = $this->request->getPost('email');                        
            //buscamos el mail
            $user = Ppostulantes::findFirst(
                array(
                    "correo = :email: AND baja_logica= :estado:",
                    "bind" => array('email' => $email, 'estado' => 1)
                    ));
            if ($user != false) {
                $password=$this->_generarPass();
                $user->password = $password;
                if ($user->save()) {
                    $destinatario = strtoupper($user->nombre).' '.strtoupper($user->app).' '.strtoupper($user->apm);
                    $correo_destinatario=$user->correo;
                    $contenido_html ='<p>Estimad@ '.$destinatario.', </p>
                    <p>Acaba de actualizar su contraseña al sistema de postulación de la empresa "MI TELEFERICO".</p>
                    <p><b>Usuario:</b> '.$correo_destinatario.'</p>
                    <p><b>Contraseña:</b> '.$password.'</p><br>
                    <p>http://convocatorias.miteleferico.bo/</p>';
                    $contenido = 'Estimad@ '.$destinatario.', Acaba de realizar su registro correctamente al sistema de postulación de la empresa "MI TELEFERICO". Usuario: '.$correo_destinatario.' Contraseña: '.$password.' http://convocatorias.miteleferico.bo/';
                    $mail = new PHPMailer();
                    $mail->IsSMTP();
                    $mail->SMTPAuth = true;
                    $mail->SMTPSecure = "ssl";
                    $mail->Host = "correo.miteleferico.bo";
                    $mail->Port = 465;
                    $mail->Username = "rrhh@miteleferico.bo";
                    $mail->Password = "recursos442k15";
                    $mail->From = "rrhh@miteleferico.bo";
                    $mail->FromName = "\"MI TELEFERICO\" POSTULACION EN LINEA ";
                    $mail->Subject = utf8_decode("Contraseña postulación en linea \"MI TELEFERICO\"");
                    $mail->AltBody = $contenido;
                    $mail->MsgHTML(utf8_decode($contenido_html));
                    $mail->AddAddress($correo_destinatario, $destinatario);
                    $mail->IsHTML(true);
                    if(!$mail->Send()) {
                      $this->flashSession->error("<strong>Error: </strong>El correo electronico no existe.");
                  } else{
                    $this->flashSession->success("<strong>Exito: </strong>Revise su correo electronico ".$correo_destinatario.", se le envio la contraseña para postularse. ");
                }

            }else{
                $this->flashSession->error("<strong>Error: </strong>no se guardo el registro...");
            }
            $this->response->redirect('/');
        }
        $this->flashSession->error('Email inexsitente en el sistema, o usuario No habilitado');    
    }
    
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
            $password=$this->_generarPass();
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
            $resul->password = $password;
            $resul->lugar_postulacion = $this->request->getPost('lugar_postulacion');
            $resul->fecha_registro = date("Y-m-d H:i:s");
            $resul->estado = 0;
            $resul->libreta_militar = $this->request->getPost('libreta_militar');
            $resul->empadronamiento = $this->request->getPost('empadronamiento');
            $resul->parentesco = $this->request->getPost('parentesco');
            $resul->nivel = 2;
            $resul->baja_logica = 1;
            if ($resul->save()) {

                $destinatario = strtoupper($this->request->getPost('nombre')).' '.strtoupper($this->request->getPost('app')).' '.strtoupper($this->request->getPost('apm'));
                $correo_destinatario=$this->request->getPost('correo');
                $contenido_html ='<p>Estimad@ '.$destinatario.', </p>
                <p>Acaba de realizar su registro correctamente al sistema de postulación de la empresa "MI TELEFERICO".</p>
                <p><b>Usuario:</b> '.$correo_destinatario.'</p>
                <p><b>Contraseña:</b> '.$password.'</p><br>
                <p>http://convocatorias.miteleferico.bo/</p>';
                $contenido = 'Estimad@ '.$destinatario.', Acaba de realizar su registro correctamente al sistema de postulación de la empresa "MI TELEFERICO". Usuario: '.$correo_destinatario.' Contraseña: '.$password.' http://convocatorias.miteleferico.bo/';
                $mail = new PHPMailer();
                $mail->IsSMTP();
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = "ssl";
                $mail->Host = "correo.miteleferico.bo";
                $mail->Port = 465;
                $mail->Username = "rrhh@miteleferico.bo";
                $mail->Password = "recursos442k15";
                $mail->From = "rrhh@miteleferico.bo";
                $mail->FromName = "\"MI TELEFERICO\" POSTULACION EN LINEA ";
                $mail->Subject = utf8_decode("Contraseña postulación en linea \"MI TELEFERICO\"");
                $mail->AltBody = $contenido;
                $mail->MsgHTML(utf8_decode($contenido_html));
                $mail->AddAddress($correo_destinatario, $destinatario);
                $mail->IsHTML(true);

                if(!$mail->Send()) {
                  //echo "ERROR: " . $mail->ErrorInfo;
                  $this->flashSession->error("<strong>Error: </strong>El correo electronico no existe.");
              } else{
                $this->flashSession->success("<strong>Exito: </strong>Registro guardado correctamente.Revise su correo electronico ".$correo_destinatario.", se le envio la contraseña para postularse. Se le recomienda revisar tambien su bandeja de correo No deseado o Spams.");
            }
            
        }else{
            $this->flashSession->error("<strong>Error: </strong>no se guardo el registro...");
        }
        $this->response->redirect('/');
    }
        //$this->view->setMainView('registrar');
    $this->view->setLayout('registrar');
    $model = new Ppostulantes();
    $resul= $model->cargosConvocatoria();
    $this->view->setVar('cargos', $resul);

        // $this->view->setVar('pass', $pass);
}

    // public function pruebaAction()
    // {

    //     $destinatario = 'Luis Freddy'; //strtoupper($this->request->getPost('nombre')).' '.strtoupper($this->request->getPost('app')).' '.strtoupper($this->request->getPost('apm'));
    //     $correo_destinatario='fredd_forzz@hotmail.com';
    //     $contenido_html ="<b>Hola</b>";
    //     $mail = new PHPMailer();
    //     $mail->IsSMTP();
    //     $mail->SMTPAuth = true;
    //     $mail->SMTPSecure = "ssl";
    //     $mail->Host = "correo.miteleferico.bo";
    //     $mail->Port = 465;
    //     $mail->Username = "rrhh@miteleferico.bo";
    //     $mail->Password = "recursos442k15";
    //     $mail->From = "rrhh@miteleferico.bo";
    //     $mail->FromName = "\"MI TELEFERICO\" POSTULACION EN LINEA ";
    //     $mail->Subject = utf8_decode("Contraseña postulacion en linea \"MI TELEFERICO\"");
    //     $mail->AltBody = "Hola";
    //     $mail->MsgHTML($contenido_html);
    //     $mail->AddAddress($correo_destinatario, $destinatario);
    //     $mail->IsHTML(true);
    //     if(!$mail->Send()) {
    //       echo "ERROR: " . $mail->ErrorInfo;
    //       } else{
    //     echo "Correo enviado correctamente";
    //     }
    // }

    public function uniqueEmailAction()
    {
        $resul = Ppostulantes::findFirst(array('correo="'.$_POST['email'].'"'));
        $msm = "";
        if ($resul!=false) {
            $msm = "Correo electronico ya existe.";
        }
        $this->view->disable();
        echo $msm;
    }
    private function _generarPass()
    {
        $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
        $pass = "";
        for($i=0;$i<8;$i++) {
            $pass .= substr($str,rand(0,62),1);
        }
        return $pass;
    }

    public function descargarAction()
    {
        $filename = $_GET['file'];
        //$filename = 'file/convocatoria.pdf';
        // $filename = 'file/CONVOCATORIA PUBLICA EXTERNA 003-2015.pdf';
        header('Pragma: public');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Cache-Control: private', false);
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="'. basename($filename) . '";');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($filename));
        readfile($filename);
        exit;
    }

    public function visionAction()
    {
        $this->view->setLayout('vision');
    }

    public function objetivoAction()
    {
        $this->view->setLayout('vision');
    }

    public function principioAction()
    {
        $this->view->setLayout('vision');
    }

    public function cargosAction()
    {
        $model = new Ppostulantes();
        $resul= $model->convocatorias();
        $this->view->setVar('convocatoria', $resul);
        $this->view->setLayout('cargos');

        
    }

    // public function descargarAction($archivo_id)
    // {
    //     $resul = Archivos::findFirstById($archivo_id);
    //     $filename = 'http://rrhh.local/'.$resul->carpeta.$resul->nombre_archivo;
    //     header('Pragma: public');
    //     header('Expires: 0');
    //     header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    //     header('Cache-Control: private', false);
    //     header('Content-Type: '.$resul->tipo_archivo);
    //     header('Content-Disposition: attachment; filename="'. basename(substr($resul->nombre_archivo, 15)) . '";');
    //     header('Content-Transfer-Encoding: binary');
    //     header('Content-Length: ' . filesize($filename));
    //     readfile($filename);
    //     exit;
    // }
}
