<?php

class Pexplabespecificas extends \Phalcon\Mvc\Model
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
    public $postulante_id;

    /**
     *
     * @var integer
     */
    public $pos_seguimiento_id;

    /**
     *
     * @var double
     */
    public $gestion_desde;

    /**
     *
     * @var double
     */
    public $mes_desde;

    /**
     *
     * @var double
     */
    public $gestion_hasta;

    /**
     *
     * @var double
     */
    public $mes_hasta;

    /**
     *
     * @var string
     */
    public $cargo;

    /**
     *
     * @var string
     */
    public $institucion;

    /**
     *
     * @var string
     */
    public $desc_fun;

    /**
     *
     * @var string
     */
    public $inmediato_superior;

    /**
     *
     * @var string
     */
    public $nombre_superior;

    /**
     *
     * @var string
     */
    public $doc_respaldo;

    /**
     *
     * @var integer
     */
    public $baja_logica;

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
            'postulante_id' => 'postulante_id', 
            'pos_seguimiento_id' => 'pos_seguimiento_id', 
            'gestion_desde' => 'gestion_desde', 
            'mes_desde' => 'mes_desde', 
            'gestion_hasta' => 'gestion_hasta', 
            'mes_hasta' => 'mes_hasta', 
            'cargo' => 'cargo', 
            'institucion' => 'institucion', 
            'desc_fun' => 'desc_fun', 
            'inmediato_superior' => 'inmediato_superior', 
            'nombre_superior' => 'nombre_superior', 
            'doc_respaldo' => 'doc_respaldo', 
            'baja_logica' => 'baja_logica'
        );
    }

}
