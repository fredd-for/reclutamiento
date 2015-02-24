<?php

class Parametros extends \Phalcon\Mvc\Model
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
    public $parametro;

    /**
     *
     * @var string
     */
    public $nivel;

    /**
     *
     * @var string
     */
    public $valor_1;

    /**
     *
     * @var string
     */
    public $valor_2;

    /**
     *
     * @var string
     */
    public $valor_3;

    /**
     *
     * @var string
     */
    public $valor_4;

    /**
     *
     * @var string
     */
    public $valor_5;

    /**
     *
     * @var string
     */
    public $descripcion;

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
            'parametro' => 'parametro', 
            'nivel' => 'nivel', 
            'valor_1' => 'valor_1', 
            'valor_2' => 'valor_2', 
            'valor_3' => 'valor_3', 
            'valor_4' => 'valor_4', 
            'valor_5' => 'valor_5', 
            'descripcion' => 'descripcion', 
            'observacion' => 'observacion', 
            'estado' => 'estado', 
            'baja_logica' => 'baja_logica', 
            'agrupador' => 'agrupador'
        );
    }

}
