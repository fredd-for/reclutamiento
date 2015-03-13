<?php

class PpostulantesController extends ControllerRrhh {

    private $mes_array =array(
                "1" => "ENERO",
                "2"   => "FEBRERO",
                "3" => "MARZO",
                "4" => "ABRIL",
                "5" => "MAYO",
                "6" => "JUNIO",
                "7" => "JULIO",
                "8" => "AGOSTO",
                "9" => "SEPTIEMBRE",
                "10" => "OCTUBRE",
                "11" => "NOVIEMBRE",
                "12" => "DICIEMBRE"
                );

    public function initialize() {
        parent::initialize();
    }

    public function indexAction() {
        $this->view->setVar('variable', $this->variable['loquesea']);
    if ($this->request->isPost()) {
        $model = new Ppostulantes();
        $resul = $model->convocatoriasPostuladas($this->_user->id);
        $resulReferenciaLaboral = Preferencias::find(array("postulante_id='".$this->_user->id."' and baja_logica=1"));
        $resulReferenciaPersonal = Preferenciaspersonales::find(array("postulante_id='".$this->_user->id."' and baja_logica=1"));
        $c = $_POST['nro_puestos'];
        if (count($resul)<1) {
            $this->flashSession->error("PASO 4: Debe registrar minimo una Experiencia Relacionado al Cargo".$c);
        }elseif (count($resulReferenciaLaboral)<2) {
            $this->flashSession->error("PASO 9: Debe registrar minimo dos referencias laborales");
        }elseif (count($resulReferenciaPersonal)<2) {
            $this->flashSession->error("PASO 10: Debe registrar minimo dos referencias personales");
        }else{
            foreach ($resul as $v) {
                $resul2 = new Pposcontrataciones();
                $resul2->postulante_id = $this->_user->id;
                $resul2->proceso_contratacion_id = $v->proceso_contratacion_id;
                $resul2->fecha_cierre = date("Y-m-d H:i:s");
                $resul2->estado = 1;
                $resul2->baja_logica = 1; 
                if ($resul2->save()) {
                    $model = new Ppostulantes();
                    $resul3 = $model->cerrarExpEspecifica($v->proceso_contratacion_id,$this->_user->id);
                    $this->flashSession->success("Exito: Usted termino correctamente su postulación...");
                }else{
                    $this->flashSession->error("Error: no se guardo el registro...");
                }
            }

        }
    }    

    $model = new Ppostulantes();
    $resul0 = $model->verificarangofecha(); 
    $resul = $model->verificarPostulacion($this->_user->id);

    if (count($resul0)>0) {
        if(count($resul)>0){
        $this->response->redirect('/ppostulantes/view/');   
        }    
    }else{
        $this->response->redirect('/ppostulantes/view/');   
    }
    


    // $detalle_array=array(
    //             "BACHILLER" => "BACHILLER",
    //             "ESTUDIANTE UNIVERSITARIO"   => "ESTUDIANTE UNIVERSITARIO",
    //             "TECNICO MEDIO" => "TECNICO MEDIO",
    //             "TECNICO SUPERIOR" => "TECNICO SUPERIOR",
    //             "EGRESADO" => "EGRESADO",
    //             "LICENCIADO - INGENIERO" => "LICENCIADO - INGENIERO",
    //             "DIPLOMADO" => "DIPLOMADO",
    //             "MAESTRIA" => "MAESTRIA",
    //             "DOCTORADO" => "DOCTORADO"
    //             ); 

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

    
    $doc_respaldo_array = array(
                "CERTIFICADO DE TRABAJO" => "CERTIFICADO DE TRABAJO",
                "CONTRATO"   => "CONTRATO",
                "MEMORANDUM" => "MEMORANDUM"
                );

    $nivel_array = array(
                "REGULAR" => "REGULAR",
                "BUENO"   => "BUENO",
                "MUY BUENO" => "MUY BUENO"
                );

    $sino_array = array(
                "REGULAR" => "REGULAR",
                "BUENO"   => "BUENO",
                "EXCELENTE"   => "EXCELENTE"
                );

    $idioma_array = array(
                "CASTELLO" => "CASTELLO",
                "AYMARA"   => "AYMARA",
                "QUECHUA" => "QUECHUA",
                "GUARANI" => "GUARANI",
                "INGLES" => "INGLES",
                "FRANCES" => "FRANCES",
                "ALEMAN" => "ALEMAN",
                "OTROS" => "OTROS",
                );

/*
Formacion Academica
 */
// $detalle = $this->tag->selectStatic(
//         array(
//             "detalle",
//             $detalle_array,
//             'useEmpty' => true,
//             'emptyText' => '(Selecionar)',
//             'emptyValue' => '',
//             'class' => 'form-control',
//             )
//         );

$detalle = $this->tag->select(
            array(
                'detalle',
                Parametros::find(array("baja_logica=1 and parametro='formacion_academica'","order"=>"nivel ASC")),
                'using' => array('id', "valor_1"),
                'useEmpty' => true,
                'emptyText' => '(Selecionar)',
                'emptyValue' => '',
                'class' => 'form-control'
                )
            );

$documento = $this->tag->select(
            array(
                'documento_id',
                Parametros::find(array("baja_logica=1 and parametro='tipo_documento'","order"=>"nivel ASC")),
                'using' => array('id', "valor_1"),
                'useEmpty' => true,
                'emptyText' => '(Selecionar)',
                'emptyValue' => '0',
                'class' => 'form-control'
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
            $this->mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $mes_hasta = $this->tag->selectStatic(
        array(
            "mes_hasta",
            $this->mes_array,
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
            $this->mes_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $mes_hasta_explabesp = $this->tag->selectStatic(
        array(
            "mes_hasta_explabesp",
            $this->mes_array,
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


     /*
     Seminarios o cursos
      */
     $gestion_curso = $this->tag->selectStatic(
        array(
            "gestion_curso",
            $gestion_array,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('gestion_curso', $gestion_curso);
     /*
     end seminarios o cursos
      */
     
     /*
     Paquetes y aplicaciones informaticas
      */
     $nivel_paquete = $this->tag->selectStatic(
        array(
            "nivel_paquete",
            $nivel_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('nivel_paquete', $nivel_paquete);
     /*
     end paquetes y aplicaciones
      */
     

     /*
     IDIOMAS
      */
     $idioma = $this->tag->selectStatic(
        array(
            "idioma",
            $idioma_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $lectura = $this->tag->selectStatic(
        array(
            "lectura",
            $sino_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $escritura = $this->tag->selectStatic(
        array(
            "escritura",
            $sino_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
     $conversacion = $this->tag->selectStatic(
        array(
            "conversacion",
            $sino_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('idioma', $idioma);
     $this->view->setVar('lectura', $lectura);
     $this->view->setVar('escritura', $escritura);
     $this->view->setVar('conversacion', $conversacion);
     /*
     end IDIOMAS
      */

     /*
     DOCENCIA
      */
     $gestion_docencia = $this->tag->selectStatic(
        array(
            "gestion_docencia",
            $gestion_array,
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );

     $this->view->setVar('gestion_docencia', $gestion_docencia);
     /*
     end IDIOMAS
      */


     $model = new Ppostulantes();
     $resul = $model->cargosConvocatoria($this->_user->id);

     $this->view->setVar('puestopostula', $resul);
     $this->view->setVar('detalle', $detalle);
     $this->view->setVar('documento', $documento);
     $this->view->setVar('gestion', $gestion);
     $this->view->setVar('usuario', $this->_user);
     $resul = Ppostulantes::findFirstByid($this->_user->id);
     $this->view->setVar('postulante', $resul);

     
    
     $this->persistent->parameters = null;
    $this->assets
                ->addCss('/jqwidgets/styles/jqx.base.css')
                //->addCss('/media/plugins/form-daterangepicker/daterangepicker-bs3.css')
                ->addCss('/jqwidgets/styles/jqx.custom.css')
                
                ;
        $this->assets
                ->addJs('/jqwidgets/jqxcore.js')
                ->addJs('/jqwidgets/jqxmenu.js')
                ->addJs('/jqwidgets/jqxdropdownlist.js')
                ->addJs('/jqwidgets/jqxlistbox.js')
                ->addJs('/jqwidgets/jqxcheckbox.js')
                ->addJs('/jqwidgets/jqxscrollbar.js')
                ->addJs('/jqwidgets/jqxgrid.js')
                ->addJs('/jqwidgets/jqxdata.js')
                ->addJs('/jqwidgets/jqxgrid.sort.js')
                ->addJs('/jqwidgets/jqxgrid.pager.js')
                ->addJs('/jqwidgets/jqxgrid.filter.js')
                ->addJs('/jqwidgets/jqxgrid.selection.js')
                ->addJs('/jqwidgets/jqxgrid.grouping.js')
                ->addJs('/jqwidgets/jqxgrid.columnsreorder.js')
                ->addJs('/jqwidgets/jqxgrid.columnsresize.js')
                ->addJs('/jqwidgets/jqxdatetimeinput.js')
                ->addJs('/jqwidgets/jqxcalendar.js')
                ->addJs('/jqwidgets/jqxbuttons.js')
                ->addJs('/jqwidgets/jqxdata.export.js')
                ->addJs('/jqwidgets/jqxgrid.export.js')
                ->addJs('/jqwidgets/globalization/globalize.js')
                ->addJs('/jqwidgets/jqxgrid.aggregates.js')
                ->addJs('/media/plugins/form-validation/jquery.validate.min.js')
                ->addJs('/media/plugins/form-stepy/jquery.stepy.js')
                ->addJs('/media/plugins/bootbox/bootbox.min.js')
                ->addJs('/media/demo/demo-formwizard.js')
                ->addJs('/scripts/ppostulacion/index.js')
                // ->addJs('/media/plugins/fullcalendar/fullcalendar.min.js')
                // ->addJs('/media/plugins/form-datepicker/js/bootstrap-datepicker.js')
                // ->addJs('/media/plugins/form-daterangepicker/daterangepicker.js')
                // ->addJs('/media/plugins/form-daterangepicker/moment.min.js')
        ;
     
    
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
        $this->flashSession->success("<strong>Exito: </strong>Registro actualizado correctamente.");
    }else{
        $this->flashSession->error("<strong>Error: </strong>no se guardo el registro...");
    }
    $this->response->redirect('/ppostulantes');
}


     

$this->view->setVar('usuario', $this->_user);
$resul = Ppostulantes::findFirstByid($this->_user->id);
$this->view->setVar('postulante', $resul);


}

public function viewAction()
{
    $this->view->setVar('usuario', $this->_user);
    $resul = Ppostulantes::findFirstByid($this->_user->id);
    $this->view->setVar('postulante',$resul);
    // $resul = Pformaciones::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $model = new Ppostulantes();
    $resul = $model->listpformacion($this->_user->id);
    $this->view->setVar('formacion',$resul);
    $resul = Pexplabgenerales::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('explabgeneral',$resul);
    $model = new Ppostulantes();
    $resul = $model->listpexplabespecifica($this->_user->id,1);
    $this->view->setVar('explabespecifica',$resul);
    $resul = Pcursos::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('curso',$resul);
    $resul = Ppaquetes::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('paquete',$resul);
    $resul = Pidiomas::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('idioma',$resul);
    $resul = Pdocencias::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('docencia',$resul);
    $resul = Preferencias::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('referencia',$resul);
    $resul = Preferenciaspersonales::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    $this->view->setVar('referenciapersonal',$resul);

}

public function listPformacionesAction()
{
   $this->view->setVar('usuario', $this->_user);
   //$resul = Pformaciones::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
   $model = new Ppostulantes();
   $resul = $model->listpformacion($this->_user->id);
   $this->view->disable();
   foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'detalle' => $v->detalle,
        'detalle_text' => $v->valor_1,
        'documento_id' => $v->documento_id,
        'documento_text' => $v->documento_text,
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
            $resul->detalle = $_POST['detalle'];
            $resul->documento_id = $_POST['documento_id'];
            //$resul->gestion = $_POST['gestion'];
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
            $resul->detalle = $_POST['detalle'];
            $resul->documento_id = $_POST['documento_id'];
            $resul->gestion = date("Y"); //$_POST['gestion'];
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
        'desde' => $this->mes_array[$v->mes_desde].' - '.$v->gestion_desde,
        'hasta' => $this->mes_array[$v->mes_hasta].' - '.$v->gestion_hasta,
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
   //$this->view->setVar('usuario', $this->_user);
   // $resul = Pexplabespecificas::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
   $model = new Ppostulantes();
   $resul = $model->listpexplabespecifica($this->_user->id);
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'desde' => $this->mes_array[$v->mes_desde].' - '.$v->gestion_desde,
        'hasta' => $this->mes_array[$v->mes_hasta].' - '.$v->gestion_hasta,
        'gestion_desde' => $v->gestion_desde,
        'mes_desde' => $v->mes_desde,
        'gestion_hasta' => $v->gestion_hasta,
        'mes_hasta' => $v->mes_hasta,
        'cargo' => $v->cargo,
        'institucion' => $v->institucion,
        'desc_fun' => $v->desc_fun,
        'seguimiento_id' => $v->seguimiento_id,
        'proceso_contratacion_id' => $v->proceso_contratacion_id,
        'codigo_proceso' => $v->codigo_proceso,
        'doc_respaldo' => $v->doc_respaldo
        );
    }
 $this->view->disable();
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
            $resul->desc_fun = strtoupper($_POST['desc_fun']);
            $resul->seguimiento_id = $_POST['seguimiento_id'];
            $resul->proceso_contratacion_id = $_POST['proceso_contratacion_id'];
            $resul->doc_respaldo = $_POST['doc_respaldo'];
            $resul->estado = 0;
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
            $resul->seguimiento_id = $_POST['seguimiento_id'];
            $resul->proceso_contratacion_id = $_POST['proceso_contratacion_id'];
            $resul->doc_respaldo = $_POST['doc_respaldo'];
            $resul->estado = 0;
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

/*
FUNCIONES CURSOS
 */

public function listPcursoAction()
{
   $resul = Pcursos::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'gestion' => $v->gestion,
        'institucion' => $v->institucion,
        'nombre_curso' => $v->nombre_curso,
        'duracion_hrs' => $v->duracion_hrs
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePcursoAction()
{
    if (isset($_POST['pcurso_id'])) {
        if ($_POST['pcurso_id']>0) {
            $resul = Pcursos::findFirstById($_POST['pcurso_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->nombre_curso = strtoupper($_POST['nombre_curso']);
            $resul->duracion_hrs = $_POST['duracion_hrs'];
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pcursos();
            $resul->postulante_id= $this->_user->id;
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->nombre_curso = strtoupper($_POST['nombre_curso']);
            $resul->duracion_hrs = $_POST['duracion_hrs'];
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

public function deletePcursoAction(){
    $resul = Pcursos::findFirstById($_POST['pcurso_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Cursos o seminarios
 */

/*
FUNCIONES PAQUETES Y APLICACIONES
 */

public function listPpaqueteAction()
{
   $resul = Ppaquetes::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'aplicacion' => $v->aplicacion,
        'nivel' => $v->nivel
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePpaqueteAction()
{
    if (isset($_POST['ppaquete_id'])) {
        if ($_POST['ppaquete_id']>0) {
            $resul = Ppaquetes::findFirstById($_POST['ppaquete_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->aplicacion = strtoupper($_POST['aplicacion']);
            $resul->nivel = strtoupper($_POST['nivel']);
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Ppaquetes();
            $resul->postulante_id= $this->_user->id;
            $resul->aplicacion = strtoupper($_POST['aplicacion']);
            $resul->nivel = strtoupper($_POST['nivel']);
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

public function deletePpaqueteAction(){
    $resul = Ppaquetes::findFirstById($_POST['ppaquete_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Cursos o seminarios
 */



/*
FUNCIONES IDIOMAS
 */

public function listPidiomaAction()
{
   $resul = Pidiomas::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'idioma' => $v->idioma,
        'lectura' => $v->lectura,
        'escritura' => $v->escritura,
        'conversacion' => $v->conversacion,
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePidiomaAction()
{
    if (isset($_POST['pidioma_id'])) {
        if ($_POST['pidioma_id']>0) {
            $resul = Pidiomas::findFirstById($_POST['pidioma_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->idioma = strtoupper($_POST['idioma']);
            $resul->lectura = strtoupper($_POST['lectura']);
            $resul->escritura = strtoupper($_POST['escritura']);
            $resul->conversacion = strtoupper($_POST['conversacion']);
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pidiomas();
            $resul->postulante_id= $this->_user->id;
            $resul->idioma = strtoupper($_POST['idioma']);
            $resul->lectura = strtoupper($_POST['lectura']);
            $resul->escritura = strtoupper($_POST['escritura']);
            $resul->conversacion = strtoupper($_POST['conversacion']);
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

public function deletePidiomaAction(){
    $resul = Pidiomas::findFirstById($_POST['pidioma_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Cursos o seminarios
 */

/*
FUNCIONES DOCENCIA
 */

public function listPdocenciaAction()
{
   $resul = Pdocencias::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'gestion' => $v->gestion,
        'institucion' => $v->institucion,
        'materia' => $v->materia,
        'duracion' => $v->duracion,
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePdocenciaAction()
{
    if (isset($_POST['pdocencia_id'])) {
        if ($_POST['pdocencia_id']>0) {
            $resul = Pdocencias::findFirstById($_POST['pdocencia_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->materia = strtoupper($_POST['materia']);
            $resul->duracion = $_POST['duracion'];
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Pdocencias();
            $resul->postulante_id= $this->_user->id;
            $resul->gestion = $_POST['gestion'];
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->materia = strtoupper($_POST['materia']);
            $resul->duracion = $_POST['duracion'];
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

public function deletePdocenciaAction(){
    $resul = Pdocencias::findFirstById($_POST['pdocencia_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Docencia
 */

/*
FUNCIONES REFERENCIA
 */
public function listPreferenciaAction()
{
   $resul = Preferencias::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'nombres_y_apps' => $v->nombres_y_apps,
        'institucion' => $v->institucion,
        'cargo' => $v->cargo,
        'telefono' => $v->telefono,
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePreferenciaAction()
{
    if (isset($_POST['preferencia_id'])) {
        if ($_POST['preferencia_id']>0) {
            $resul = Preferencias::findFirstById($_POST['preferencia_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->nombres_y_apps = strtoupper($_POST['nombres_y_apps']);
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->telefono = $_POST['telefono'];
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Preferencias();
            $resul->postulante_id= $this->_user->id;
            $resul->nombres_y_apps = strtoupper($_POST['nombres_y_apps']);
            $resul->institucion = strtoupper($_POST['institucion']);
            $resul->cargo = strtoupper($_POST['cargo']);
            $resul->telefono = $_POST['telefono'];
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

public function deletePreferenciaAction(){
    $resul = Preferencias::findFirstById($_POST['preferencia_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Referencias
 */

/*
FUNCIONES REFERENCIA PERSONAL
 */
public function listPreferenciapersonalAction()
{
   $resul = Preferenciaspersonales::find(array('baja_logica=1 and postulante_id='.$this->_user->id,'order' => 'id ASC'));
    foreach ($resul as $v) {
     $customers[] = array(
        'id' => $v->id,
        'nombres_y_apps' => $v->nombres_y_apps,
        'parentesco' => $v->parentesco,
        'telefono' => $v->telefono,
        );
    }
 $this->view->disable();
 echo json_encode($customers);
}


public function savePreferenciapersonalAction()
{
    if (isset($_POST['preferenciapersonal_id'])) {
        if ($_POST['preferenciapersonal_id']>0) {
            $resul = Preferenciaspersonales::findFirstById($_POST['preferenciapersonal_id']);
            $resul->postulante_id= $this->_user->id;
            $resul->nombres_y_apps = strtoupper($_POST['nombres_y_apps']);
            $resul->parentesco = strtoupper($_POST['parentesco']);
            $resul->telefono = $_POST['telefono'];
            if ($resul->save()) {
                $msm = 'Exito: Se guardo correctamente';
            }else{
                $msm = 'Error: No se guardo el registro';
            }
        }
        else{
            $resul = new Preferenciaspersonales();
            $resul->postulante_id= $this->_user->id;
            $resul->nombres_y_apps = strtoupper($_POST['nombres_y_apps']);
            $resul->parentesco = strtoupper($_POST['parentesco']);
            $resul->telefono = $_POST['telefono'];
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

public function deletePreferenciapersonalAction(){
    $resul = Preferenciaspersonales::findFirstById($_POST['preferenciapersonal_id']);
    $resul->baja_logica = 0;
    $resul->save();
    $this->view->disable();
    echo json_encode();
}

/*
end Referencia Personal
 */



}
