<?php

use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Procesoscontrataciones extends \Phalcon\Mvc\Model
{

    private $_db;
    public function lista() {
        $sql = "SELECT p.*, n.normativa,n.modalidad,n.denominacion FROM procesoscontrataciones p, normativasmod n WHERE p.normativamod_id=n.id ORDER BY p.id ASC";
        $this->_db = new Seguimientos();
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
