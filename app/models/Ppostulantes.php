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
        $sql = "SELECT s.id,CONCAT(p.codigo_proceso,' ',c.cargo) AS cargo
FROM procesoscontrataciones p
INNER JOIN seguimientos s ON p.id = s.proceso_contratacion_id
INNER JOIN pacs pa ON s.pac_id= pa.id
INNER JOIN cargos c ON pa.cargo_id=c.id
WHERE CURRENT_DATE BETWEEN p.fecha_publ AND p.fecha_concl";
        $this->_db = new Procesoscontrataciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));        
    }

}
