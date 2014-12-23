<?php

class PpostulantesController extends ControllerBase {

    public function initialize() {
        parent::initialize();
    }

    public function indexAction() {

    $detalle_array=array(
                "BACHILLER" => "BACHILLER",
                "ESTUDIANTE UNIVERSITARIO"   => "ESTUDIANTE UNIVERSITARIO",
                "TECNICO MEDIO" => "TECNICO MEDIO",
                "TECNICO SUPERIOR" => "TECNICO SUPERIOR",
                "EGRESADO" => "EGRESADO",
                "LICENCIADO - INGENIERO" => "LICENCIADO - INGENIERO",
                "DIPLOMADO" => "DIPLOMADO",
                "MAESTRIA" => "MAESTRIA",
                "DOCTORADO" => "DOCTORADO"
                ); 

    $gestion_array = array("2015" => "2015",
                "2014" => "2014",
                "2013" => "2013",
                "2012" => "2012",
                "2011" => "2011",
                "2010" => "2010",
                "2009" => "2009",
                "2008" => "2008",
                "2007" => "2007",
                "2006" => "2006",
                "2005" => "2005",
                "2004" => "2004",
                "2003" => "2003",
                "2002" => "2002",
                "2001" => "2001",
                "2000" => "2000",
                "1999" => "1999",
                "1998" => "1998",
                "1997" => "1997",
                "1996" => "1996",
                "1995" => "1995",
                "1994" => "1994"
                );

    $mes_array =array(
                "ENERO" => "ENERO",
                "FEBRERO"   => "FEBRERO",
                "MARZO" => "MARZO",
                "ABRIL" => "ABRIL",
                "MAYO" => "MAYO",
                "JUNIO" => "JUNIO",
                "JULIO" => "JULIO",
                "AGOSTO" => "AGOSTO",
                "SEPTIEMBRE" => "SEPTIEMBRE",
                "OCTUBRE" => "OCTUBRE",
                "NOVIEMBRE" => "NOVIEMBRE",
                "DICIEMBRE" => "DICIEMBRE"
                );
    $doc_respaldo_array = array(
                "CERTIFICADO DE TRABAJO" => "CERTIFICADO DE TRABAJO",
                "CONTRATO"   => "CONTRATO",
                "MEMORANDUM" => "MEMORANDUM"
                );
/*
Formacion Academica
 */
$detalle = $this->tag->selectStatic(
        array(
            "detalle",
            $detalle_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
/**********/
     
/*
Exp lab general
 */
$gestion = $this->tag->selectStatic(
        array(
            "gestion",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $mes_desde = $this->tag->selectStatic(
        array(
            "mes_desde",
            $mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $mes_hasta = $this->tag->selectStatic(
        array(
            "mes_hasta",
            $mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $gestion_desde = $this->tag->selectStatic(
        array(
            "gestion_desde",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $gestion_hasta = $this->tag->selectStatic(
        array(
            "gestion_hasta",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $doc_respaldo = $this->tag->selectStatic(
        array(
            "doc_respaldo",
            $doc_respaldo_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('mes_desde', $mes_desde);
     $this->view->setVar('mes_hasta', $mes_hasta);
     $this->view->setVar('gestion_desde', $gestion_desde);
     $this->view->setVar('gestion_hasta', $gestion_hasta);
     $this->view->setVar('doc_respaldo', $doc_respaldo);
/***********/
    
     


     /*
     exp lab especifica
      */
     
     $mes_desde_explabesp = $this->tag->selectStatic(
        array(
            "mes_desde_explabesp",
            $mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $mes_hasta_explabesp = $this->tag->selectStatic(
        array(
            "mes_hasta_explabesp",
            $mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $gestion_desde_explabesp = $this->tag->selectStatic(
        array(
            "gestion_desde_explabesp",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $gestion_hasta_explabesp = $this->tag->selectStatic(
        array(
            "gestion_hasta_explabesp",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $doc_respaldo_explabesp = $this->tag->selectStatic(
        array(
            "doc_respaldo_explabesp",
            $doc_respaldo_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('mes_desde_explabesp', $mes_desde_explabesp);
     $this->view->setVar('mes_hasta_explabesp', $mes_hasta_explabesp);
     $this->view->setVar('gestion_desde_explabesp', $gestion_desde_explabesp);
     $this->view->setVar('gestion_hasta_explabesp', $gestion_hasta_explabesp);
     $this->view->setVar('doc_respaldo_explabesp', $doc_respaldo_explabesp);
     /************/

     $model = new Ppostulantes();
     $resul = $model->puestopostula($this->_user->id);

     $this->view->setVar('puestopostula', $resul);
     $this->view->setVar('detalle', $detalle);
     $this->view->setVar('gestion', $gestion);
     $this->view->setVar('usuario', $this->_user);
     $resul = Ppostulantes::findFirstByid($this->_user->id);
     $this->view->setVar('postulante', $resul);

     

 }

 public function editAction() {

   if ($this->request->isPost()) {
    $resul = Ppostulantes::findFirstByid($this->request->getPost('id'));
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
            //$resul->correo = $this->request->getPost('correo');
    $resul->fax = $this->request->getPost('fax');
    $resul->casilla = $this->request->getPost('casilla');
            //$resul->password = $this->_generarPass();
    $resul->lugar_postulacion = $this->request->getPost('lugar_postulacion');
            //$resul->fecha_registro = date("Y-m-d H:i:s");
    $resul->estado = 0;
    $resul->libreta_militar = $this->request->getPost('libreta_militar');
    $resul->empadronamiento = $this->request->getPost('empadronamiento');
    $resul->parentesco = $this->request->getPost('parentesco');
    $resul->baja_logica = 1;
    if ($resul->save()) {
        $this->flashSession->success("<strong>Exito: </strong>Registro guardado correctamente.Revise su correo electronico, se le envio la contraseña para postularse. ");
    }else{
        $this->flashSession->error("<strong>Error: </strong>no se guardo el registro...");
    }
    $this->response->redirect('/ppostulantes');
}

$this->view->setVar('usuario', $this->_user);
$resul = Ppostulantes::findFirstByid($this->_user->id);
$this->view->setVar('postulante', $resul);
}

public function listPformacionesAction()
{
   $this->view->setVar('usuario', $this->_user);
        // $resul = Pformaciones::findFirstByid($this->_user->id);
   $resul = Pformaciones::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    	//$model = Ppostulantes::findFirstByid('1');
   $this->view->disable();
   foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'detalle' => $v->detalle,
        'gestion' => $v->gestion,
        'institucion' => $v->institucion,
        'grado' => $v->grado,
        'numero_titulo' => $v->numero_titulo,
        'nombre_rector' => $v->nombre_rector,
        'fecha_emision' => $v->fecha_emision
        );
 }
 echo json_encode($customers);
}


public function savePformacionesAction()
{
    if (isset($_POST['pformacion_id'])) {
        if ($_POST['pformacion_id']>0) {
            $resul = Pformaciones::findFirstById($_POST['pformacion_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->detalle = strtoupper($_POST['detalle']);
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->grado = strtoupper($_POST['grado']);
            $resul->numero_titulo = strtoupper($_POST['numero_titulo']);
            $resul->fecha_emision = date("Y-m-d",strtotime($_POST['fecha_emision']));
                // $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pformaciones();
            $resul->postulante_id= $this->_user->id;
            $resul->detalle = strtoupper($_POST['detalle']);
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->grado = strtoupper($_POST['grado']);
            $resul->numero_titulo = strtoupper($_POST['numero_titulo']);
            $resul->fecha_emision = date("Y-m-d",strtotime($_POST['fecha_emision']));
            $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }

        }   
    }
    $this->view->disable();
    echo json_encode($msm);
}

public function deletePformacionesAction(){
    $resul = Pformaciones::findFirstById($_POST['pformacion_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}


/*
FUNCIONES EXP LAB GENERAL
 */

public function listPexplabgeneralAction()
{
   $this->view->setVar('usuario', $this->_user);
        // $resul = Pformaciones::findFirstByid($this->_user->id);
   $resul = Pexplabgenerales::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
        //$model = Ppostulantes::findFirstByid('1');
   $this->view->disable();
   foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'desde' => $v->mes_desde.' - '.$v->gestion_desde,
        'hasta' => $v->mes_hasta.' - '.$v->gestion_hasta,
        'gestion_desde' => $v->gestion_desde,
        'mes_desde' => $v->mes_desde,
        'gestion_hasta' => $v->gestion_hasta,
        'mes_hasta' => $v->mes_hasta,
        'cargo' => $v->cargo,
        'empresa' => $v->empresa,
        'motivo_retiro' => $v->motivo_retiro,
        'doc_respaldo' => $v->doc_respaldo
        );
 }
 echo json_encode($customers);
}


public function savePexplabgeneralAction()
{
    if (isset($_POST['pexplabgeneral_id'])) {
        if ($_POST['pexplabgeneral_id']>0) {
            $resul = Pexplabgenerales::findFirstById($_POST['pexplabgeneral_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->gestion_desde = $_POST['gestion_desde'];
            $resul->mes_desde = $_POST['mes_desde'];
            $resul->gestion_hasta = $_POST['gestion_hasta'];
            $resul->mes_hasta = $_POST['mes_hasta'];
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->empresa = strtoupper($_POST['empresa']);
            $resul->motivo_retiro = strtoupper($_POST['motivo_retiro']);
            $resul->doc_respaldo = $_POST['doc_respaldo'];
                // $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pexplabgenerales();
            $resul->postulante_id= $this->_user->id;
            $resul->gestion_desde = $_POST['gestion_desde'];
            $resul->mes_desde = $_POST['mes_desde'];
            $resul->gestion_hasta = $_POST['gestion_hasta'];
            $resul->mes_hasta = $_POST['mes_hasta'];
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->empresa = strtoupper($_POST['empresa']);
            $resul->motivo_retiro = strtoupper($_POST['motivo_retiro']);
            $resul->doc_respaldo = $_POST['doc_respaldo'];
            $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }

        }   
    }
    $this->view->disable();
    echo json_encode($msm);
}

public function deletePexplabgeneralAction(){
    $resul = Pexplabgenerales::findFirstById($_POST['pexplabgeneral_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}


/*
FUNCIONES EXP LAB ESPECIFICA
 */

public function listPexplabespecificaAction()
{
   $this->view->setVar('usuario', $this->_user);
        // $resul = Pformaciones::findFirstByid($this->_user->id);
   $resul = Pexplabespecificas::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
        //$model = Ppostulantes::findFirstByid('1');
   $this->view->disable();
   foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'desde' => $v->mes_desde.' - '.$v->gestion_desde,
        'hasta' => $v->mes_hasta.' - '.$v->gestion_hasta,
        'gestion_desde' => $v->gestion_desde,
        'mes_desde' => $v->mes_desde,
        'gestion_hasta' => $v->gestion_hasta,
        'mes_hasta' => $v->mes_hasta,
        'cargo' => $v->cargo,
        'institucion' => $v->institucion,
        'pospue' => $v->pospue,
        'doc_respaldo' => $v->doc_respaldo
        );
 }
 echo json_encode($customers);
}


public function savePexplabespecificaAction()
{
    if (isset($_POST['pexplabespecifica_id'])) {
        if ($_POST['pexplabespecifica_id']>0) {
            $resul = Pexplabespecificas::findFirstById($_POST['pexplabespecifica_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->gestion_desde = $_POST['gestion_desde'];
            $resul->mes_desde = $_POST['mes_desde'];
            $resul->gestion_hasta = $_POST['gestion_hasta'];
            $resul->mes_hasta = $_POST['mes_hasta'];
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->pos_seguimiento_id = $_POST['pospue'];
            $resul->doc_respaldo = $_POST['doc_respaldo'];
                // $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pexplabespecificas();
            $resul->postulante_id= $this->_user->id;
            $resul->gestion_desde = $_POST['gestion_desde'];
            $resul->mes_desde = $_POST['mes_desde'];
            $resul->gestion_hasta = $_POST['gestion_hasta'];
            $resul->mes_hasta = $_POST['mes_hasta'];
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->desc_fun = strtoupper($_POST['desc_fun']);
            $resul->pos_seguimiento_id = strtoupper($_POST['pospue']);
            $resul->doc_respaldo = $_POST['doc_respaldo'];
            $resul->baja_logica = 1;
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }

        }   
    }
    $this->view->disable();
    echo json_encode($msm);
}

public function deletePexplabespecificaAction(){
    $resul = Pexplabespecificas::findFirstById($_POST['pexplabespecifica_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

}
