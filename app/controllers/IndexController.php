<?php

class IndexController extends ControllerRrhh {

    public function initialize() {
        parent::initialize();
    }

    public function indexAction() {
        $organigrama = Organigramas::findFirst("padre_id = '0'");
        $this->listar($organigrama->id, $organigrama->unidad_administrativa, $organigrama->sigla);
        $this->lista.='</ul>';
        $config = array();

        $this->assets
                
                ->addCss('/media/plugins/org/css/primitives.latest.css')
                //->addCss('/js/jorgxchart/custom.css')
        ;
        $this->assets
                ->addJs('/js/jorgchart/jquery.jOrgChart.js')
                ->addJs('/media/plugins/org/js/jquery/jquery-ui-1.10.2.custom.min.js')
                ->addJs('/media/plugins/org/js/primitives.min.js')
                ->addJs('/scripts/index.js')
                ;
        $this->view->setVar('lista', $this->lista);
        $this->view->setVar('usuario', $this->_user);
        $personal = consultas::personalActivo()->count();
        $personas = consultas::personasActivo()->count();
        $acefalos = consultas::acefalos()->count();
        $model = new Procesoscontrataciones();
		$procesos= $model->lista()->count();
        $this->view->setVar('personal', $personal);
        $this->view->setVar('personas', $personas);
        $this->view->setVar('acefalos', $acefalos);
        $this->view->setVar('procesos', $procesos);
    }

    //organigrma
    
    public function organigramaAction($id){
        $this->view->disable();
        $mOrganigrama=  consultas::organigrama();
        $organigrama=array();
        
        foreach ($mOrganigrama as $o){
             $parent=$o->padre_id;
            if($o->padre_id==0)
            $parent=null;
            $organigrama[$o->id]=array(
                "id"=>$o->id,                
                "parent"=>$parent,
                "title"=>$o->nivel_estructural,
                "email"=>'Acefalo',
                "description"=>$o->unidad_administrativa,
                "phone"=>$o->id,  
                "email"=>'',  
                'templateName'=> "contactTemplate",
                'href'=> $o->id,  
                "itemTitleColor"=> '#0065B3'
            );
        }
        //fiscalizacion interna
         $organigrama[1223]=array(
                "id"=>1223,                
                "parent"=>1,
                "title"=>'DEPARTAMENTO',
                "email"=>'Acefalo',
                "description"=>'Fiscalizacion Interna',
                "phone"=>1223,  
                "email"=>'',  
                'templateName'=> "contactTemplate",
                'href'=> "contactTemplate",   
                'itemType'=>1,
              "itemTitleColor"=> '#9358AC'
             
            );
        echo json_encode(array_values($organigrama),JSON_NUMERIC_CHECK);
    }
    public function personigramaAction($id){
        $this->view->disable();
        $mOrganigrama=  consultas::personigrama($id);
        $organigrama=array();
        $relaciones=consultas::personigramacargo($id);
        foreach ($mOrganigrama as $o){
            $parent=$o->depende_id;
            if($o->depende_id==0)
            $parent=null;
            $organigrama[$o->id]=array(
                "id"=>$o->id,                
                "parent"=>$parent,
                "title"=>'ACEFALO',
                "email"=>'Acefalo',
                "description"=>$o->cargo,
                "image"=>'/personal/hombre.jpg',  
                'templateName'=> "PersonTemplate",
                'ci'=> $o->id
            );
        }
        foreach ($relaciones as $r){            
            $organigrama[$r->cargo_id]['title']=$r->nombre;                
            $foto='/personal/hombre.jpg';
             if (file_exists('personal/' . $r->foto)) {
                    $foto='/personal/' . $r->foto;
                }
            $organigrama[$r->cargo_id]['image']=$foto;                
            $organigrama[$r->cargo_id]['ci']=$r->ci;                
        }
        echo json_encode(array_values($organigrama),JSON_NUMERIC_CHECK);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public function listar($id, $oficina, $sigla) {
        $h = organigramas::count("padre_id='$id'");
        $this->lista.='<li id="org" style="display:none">
		<hr/>
                <a href="javascript:void(0)" title="Ver Personigrama" class="personigrama" oficina="' . $id . '"   id="lista">' . $oficina . '</a>';

        if ($h > 0) {
            //echo '<ul>';
            $this->lista.='<ul>';
            $hijos = Organigramas::find(array("padre_id='$id' and baja_logica=1 AND visible='1'"));
            //$hijos = ORM::factory('oficinas')->where('padre', '=', $id)->find_all();
            foreach ($hijos as $hijo) {
                $oficina = $hijo->unidad_administrativa;
                $this->listar($hijo->id, $oficina, $hijo->sigla);
            }
            $this->lista.='</ul>';
            // echo '</ul>';
        } else {
            $this->lista.='</li>';
            //   echo '</li>';
        }
    }

    public function personalAction($organigrama_id) {
        $this->view->disable();

        $cargo = cargos::findFirst(array("organigrama_id='$organigrama_id' and depende_id='0'"));
        if ($cargo != false) {

            $this->listarPersonal($cargo->id, $cargo->cargo, $cargo->codigo, $cargo->estado);
            $this->lista.='</ul>';
            $config = array();
        } else {
            $this->lista.='<h3>No existe cargos dentro la oficina..</h3>';
        }
        echo $this->lista;
    }

    /* /lista de personal */

    public function listarPersonal($id, $cargo, $codigo, $estado) {
        $h = cargos::count("depende_id='$id'");
        $datos_usuario = "";
        $nombre = "";
        if ($estado == 0) {
            $datos_usuario = ' <img src="/images/personal/imagen_acefalo.jpg" class="foto"title="ACEFALO" height="50" width="50"><br>ACEFALO';
        } else {
            $ci_activo = '1';    
            $cargo_ci=new cargos();
            $ci = $cargo_ci->getCI($id);
            
            foreach ($ci as $v) {
                $ci_activo = $v->ci;
                $nombre = $v->nombre;
            }
            $datos_usuario = ' <img src="/personal/'.$ci_activo.'.jpg" class="foto" title="Adjudicado" height="50" width="50">';
            $datos_usuario.="<br>" . $nombre;
        }
        $this->lista.='<li id="org2" style="display:none"><span>' . $codigo . '</span><br>' . $cargo . '<br>' . $datos_usuario;
        if ($h > 0) {
            //echo '<ul>';

            $this->lista.='<ul>';
            $hijos = cargos::find("depende_id='$id' and baja_logica=1");
            //$hijos = ORM::factory('oficinas')->where('padre', '=', $id)->find_all();
            foreach ($hijos as $hijo) {
                $cargo = $hijo->cargo;
                $this->listarPersonal($hijo->id, $cargo, $hijo->codigo, $hijo->estado);
                //echo $hijo->id. $cargo. $hijo->codigo. $hijo->estado;
            }
            $this->lista.='</ul>';
            // echo '</ul>';
        } else {
            $this->lista.='</li>';
            //   echo '</li>';
        }
    }

}
