<?php

use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Procesoscontrataciones extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var integer
     */
    public $normativamod_id;

    /**
     *
     * @var string
     */
    public $codigo_convocatoria;

    /**
     *
     * @var integer
     */
    public $regional_id;

    /**
     *
     * @var string
     */
    public $codigo_proceso;

    /**
     *
     * @var integer
     */
    public $gestion;

    /**
     *
     * @var string
     */
    public $fecha_publ;

    /**
     *
     * @var string
     */
    public $fecha_recep;

    /**
     *
     * @var string
     */
    public $fecha_concl;

    /**
     *
     * @var integer
     */
    public $tipoconvocatoria_id;

    /**
     *
     * @var string
     */
    public $observacion;

    /**
     *
     * @var integer
     */
    public $estado;

    /**
     *
     * @var integer
     */
    public $baja_logica;

    /**
     *
     * @var integer
     */
    public $agrupador;

    /**
     *
     * @var integer
     */
    public $user_reg_id;

    /**
     *
     * @var string
     */
    public $fecha_reg;

    /**
     *
     * @var integer
     */
    public $user_mod_id;

    /**
     *
     * @var string
     */
    public $fecha_mod;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("");
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'normativamod_id' => 'normativamod_id', 
            'codigo_convocatoria' => 'codigo_convocatoria', 
            'regional_id' => 'regional_id', 
            'codigo_proceso' => 'codigo_proceso', 
            'gestion' => 'gestion', 
            'fecha_publ' => 'fecha_publ', 
            'fecha_recep' => 'fecha_recep', 
            'fecha_concl' => 'fecha_concl', 
            'tipoconvocatoria_id' => 'tipoconvocatoria_id', 
            'observacion' => 'observacion', 
            'estado' => 'estado', 
            'baja_logica' => 'baja_logica', 
            'agrupador' => 'agrupador', 
            'user_reg_id' => 'user_reg_id', 
            'fecha_reg' => 'fecha_reg', 
            'user_mod_id' => 'user_mod_id', 
            'fecha_mod' => 'fecha_mod'
        );
    }

    private $_db;
    public function lista() {
        $sql = "SELECT ROW_NUMBER() OVER(ORDER BY p.id asc) AS nro,p.*, n.normativa,n.modalidad,n.denominacion 
        FROM procesoscontrataciones p, normativasmod n WHERE p.baja_logica=1 and p.normativamod_id=n.id ORDER BY p.id ASC";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listseguimiento()
    {
        $sql = "SELECT ROW_NUMBER() OVER(ORDER BY s.id asc) AS nro,s.id,s.pac_id,s.proceso_contratacion_id,se.estado, c.codigo,c.cargo,n.sueldo,o.unidad_administrativa
FROM seguimientos s 
INNER JOIN seguimientosestados se ON s.seguimiento_estado_id=se.id
INNER JOIN pacs p ON s.pac_id=p.id
INNER JOIN cargos c ON p.cargo_id=c.id
INNER JOIN nivelsalariales n ON c.codigo_nivel=n.nivel AND n.activo=1
INNER JOIN organigramas o ON c.organigrama_id = o.id
WHERE s.baja_logica=1 ORDER BY s.id ASC";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));   
    }


    public function getSeguimiento($id)
    {
        $sql = "SELECT s.*,p.codigo_convocatoria,n.denominacion FROM seguimientos s
INNER JOIN procesoscontrataciones p ON s.proceso_contratacion_id=p.id
INNER JOIN normativasmod n ON p.normativamod_id=n.id
WHERE s.id='$id'";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));     
    }

    public function getPerfilCargo($id)
    {
        $sql = "SELECT o.area_sustantiva,ca.* 
FROM seguimientos s, pacs p, cargos c, organigramas o, nivelsalariales n, cargosperfiles ca
WHERE s.id='$id' AND s.pac_id=p.id AND p.cargo_id=c.id AND c.organigrama_id=o.id AND c.nivelsalarial_id=n.id AND ca.nivelsalarial_id = n.id AND ca.baja_logica=1";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));     
    }

    public function cargosConvocatoria()
    {
        $sql = "SELECT s.id,p.codigo_proceso,c.cargo
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id
        INNER JOIN pacs pa ON s.pac_id= pa.id
        INNER JOIN cargos c ON pa.cargo_id=c.id
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_concl";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));        
    }
    /**
     * Función para la obtención del listado de procesos disponibles de acuerdo a la condición referida en el parámetro enviado.
     * @param $id_condicion Identificador de la condición de relación laboral.
     * @param $sw Variable que identifica que debe considerarse procesos para consultoría por producto.
     * @author JLM
     * @return Resultset Conjunto de registros relacionados a los procesos de contrataciones.     *
     */
    public function listaProcesosPorCondicion($id_condicion,$sw=0) {

        $sql = "SELECT pc.* FROM procesoscontrataciones pc ";
        $sql .= "INNER JOIN normativasmod nm ON nm.id = pc.normativamod_id ";
        switch($id_condicion){
            case 1:$sql .= "WHERE nm.permanente = 1 ";break;
            case 2:$sql .= "WHERE nm.eventual = 1 ";break;
            case 3:$sql .= "WHERE nm.consultor = 1 ";break;
        }
        $sql .= "ORDER BY pc.codigo_proceso";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }


}
