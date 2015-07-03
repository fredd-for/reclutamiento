<?php
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;
class Ppostulantes extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $nombre;

    /**
     *
     * @var string
     */
    public $app;

    /**
     *
     * @var string
     */
    public $apm;

    /**
     *
     * @var string
     */
    public $sexo;

    /**
     *
     * @var string
     */
    public $ci;

    /**
     *
     * @var string
     */
    public $expedido;

    /**
     *
     * @var string
     */
    public $fecha_nac;

    /**
     *
     * @var string
     */
    public $nacionalidad;

    /**
     *
     * @var string
     */
    public $estado_civil;

    /**
     *
     * @var string
     */
    public $direccion;

    /**
     *
     * @var string
     */
    public $telefono;

    /**
     *
     * @var string
     */
    public $celular;

    /**
     *
     * @var string
     */
    public $correo;

    /**
     *
     * @var string
     */
    public $fax;

    /**
     *
     * @var string
     */
    public $casilla;

    /**
     *
     * @var string
     */
    public $password;

    /**
     *
     * @var string
     */
    public $lugar_postulacion;

    /**
     *
     * @var string
     */
    public $fecha_registro;

    /**
     *
     * @var string
     */
    public $estado;

    /**
     *
     * @var string
     */
    public $libreta_militar;

    /**
     *
     * @var string
     */
    public $empadronamiento;

    /**
     *
     * @var string
     */
    public $parentesco;

    /**
     *
     * @var integer
     */
    public $baja_logica;

    /**
     *
     * @var integer
     */
    public $logins;

    /**
     *
     * @var integer
     */
    public $nivel;

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
     private $_db;
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'nombre' => 'nombre', 
            'app' => 'app', 
            'apm' => 'apm', 
            'sexo' => 'sexo', 
            'ci' => 'ci', 
            'expedido' => 'expedido', 
            'fecha_nac' => 'fecha_nac', 
            'nacionalidad' => 'nacionalidad', 
            'estado_civil' => 'estado_civil', 
            'direccion' => 'direccion', 
            'telefono' => 'telefono', 
            'celular' => 'celular', 
            'correo' => 'correo', 
            'fax' => 'fax', 
            'casilla' => 'casilla', 
            'password' => 'password', 
            'lugar_postulacion' => 'lugar_postulacion', 
            'fecha_registro' => 'fecha_registro', 
            'estado' => 'estado', 
            'libreta_militar' => 'libreta_militar', 
            'empadronamiento' => 'empadronamiento', 
            'parentesco' => 'parentesco', 
            'baja_logica' => 'baja_logica',
            'logins' => 'logins',
            'nivel' => 'nivel',
        );
    }

    public function cargosConvocatoria()
    {   
        $sql = "SELECT DISTINCT on (c.cargo) c.cargo,p.id AS proceso_contratacion_id,s.id, CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo, p.dominio
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id AND s.baja_logica=1
        INNER JOIN pacs pa ON s.pac_id= pa.id
        INNER JOIN cargos c ON pa.cargo_id=c.id
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1
        ORDER BY c.cargo , s.id";

        // $sql = "SELECT p.id AS proceso_contratacion_id,s.id,CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo
        // FROM procesoscontrataciones p
        // INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id AND s.baja_logica=1
        // INNER JOIN pacs pa ON s.pac_id= pa.id
        // INNER JOIN cargos c ON pa.cargo_id=c.id
        // WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1 ";

        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));        
    }

    public function cargosSeleccionados($postulante_id)
    {
        $sql="SELECT v.*, ps.seguimiento_id FROM
(SELECT DISTINCT on (c.cargo) c.cargo,p.id AS proceso_contratacion_id,s.id, CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo, p.dominio
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id AND s.baja_logica=1
        INNER JOIN pacs pa ON s.pac_id= pa.id
        INNER JOIN cargos c ON pa.cargo_id=c.id
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1
        ORDER BY c.cargo , s.id) v
LEFT JOIN pposseguimientos ps ON v.id=ps.seguimiento_id AND ps.postulante_id = '$postulante_id'";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }
    // public function puestopostula($postulante_id)
    // {
    //     $sql = "SELECT p.*,CONCAT(pr.codigo_proceso,' ',c.cargo) AS cargo
    //     FROM pposseguimientos p
    //     INNER JOIN seguimientos s ON p.seguimiento_id = s.id
    //     INNER JOIN procesoscontrataciones pr ON s.proceso_contratacion_id=pr.id AND pr.baja_logica=1
    //     INNER JOIN pacs pa ON s.pac_id=pa.id
    //     INNER JOIN cargos c ON pa.cargo_id = c.id
    //     WHERE p.postulante_id='$postulante_id' AND p.baja_logica=1";
    //     $this->_db = new Procesoscontrataciones();
    //     return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));        
    // }

    public function listpformacion($postulante_id)
    {
        $sql="SELECT pf.*, pa.valor_1,pa2.valor_1 documento_text FROM pformaciones pf
        INNER JOIN parametros pa ON pf.detalle = pa.id
        LEFT JOIN parametros pa2 ON pf.documento_id = pa2.id
        WHERE pf.postulante_id='$postulante_id' AND pf.baja_logica = 1 ORDER BY pf.id ASC";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listpexplabespecifica($postulante_id,$estado=0)
    {
        $where = '';
        if ($estado==0) {
            $where=' AND pe.estado = 0';
        }
        $sql="SELECT pe.*, pr.codigo_convocatoria, CONCAT(pr.codigo_proceso,' ',ca.cargo) as codigo_proceso
        FROM pexplabespecificas pe
        INNER JOIN seguimientos se ON pe.seguimiento_id = se.id
        INNER JOIN procesoscontrataciones pr ON se.proceso_contratacion_id = pr.id
        INNER JOIN pacs pa ON se.pac_id = pa.id
        INNER JOIN cargos ca ON pa.cargo_id = ca.id
        WHERE pe.postulante_id='$postulante_id' AND pe.baja_logica=1 ".$where;
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function convocatoriasPostuladas($postulante_id)
    {
        // $sql="SELECT proceso_contratacion_id 
        // FROM pexplabespecificas WHERE postulante_id='$postulante_id' AND estado=0 AND baja_logica=1 GROUP BY proceso_contratacion_id ";
        $sql = "SELECT * 
        FROM pposseguimientos 
        WHERE postulante_id = '$postulante_id' AND proceso_contratacion_id in (SELECT p.id
            FROM procesoscontrataciones p
            WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1)";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function verificarangofecha()
    {
        $sql="SELECT * 
        FROM procesoscontrataciones p
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_concl AND p.baja_logica=1";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));

    }

    public function verificarPostulacion($postulante_id)
    {
        $sql="SELECT * 
        FROM procesoscontrataciones p
        INNER JOIN pposcontrataciones pc ON p.id=pc.proceso_contratacion_id 
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_concl AND p.baja_logica=1 AND pc.estado =1 AND pc.postulante_id='$postulante_id'";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function cerrarExpEspecifica($proceso_contratacion_id='',$postulante_id='')
    {
        $sql="UPDATE pexplabespecificas SET estado = 1 WHERE proceso_contratacion_id ='$proceso_contratacion_id' and postulante_id = $postulante_id";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function convocatorias()
    {
        $sql="SELECT  DISTINCT p.*
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id AND s.baja_logica=1
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listacargos($proceso_contratacion_id)
    {
        $sql="SELECT  DISTINCT CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id AND s.baja_logica=1
        INNER JOIN pacs pa ON s.pac_id= pa.id
        INNER JOIN cargos c ON pa.cargo_id=c.id
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1 AND p.id='$proceso_contratacion_id'";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listposseguimiento($postulante_id)
    {
        $sql="SELECT p.id AS proceso_contratacion_id,s.id,CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo
        FROM procesoscontrataciones p
        INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id
        INNER JOIN pposseguimientos ps ON s.id = ps.seguimiento_id AND ps.baja_logica = 1
        INNER JOIN pacs pa ON s.pac_id= pa.id
        INNER JOIN cargos c ON pa.cargo_id=c.id
        WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_recep AND p.baja_logica=1 AND ps.postulante_id='$postulante_id'";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

}
