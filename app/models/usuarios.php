<?php

use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Usuarios extends \Phalcon\Mvc\Model {

    private $_db;

    public function initialize() {
        $this->_db = new usuarios();
        //   parent::initialize();
    }

    public function lista() {
        //$this->setConnectionService('db');
        $sql = "SELECT * FROM usuarios";
        $users = new Users();
        return new Resultset(null, $users, $users->getReadConnection()->query($sql));
    }

    public function pendientesOficina($id) {
        $sql = "SELECT 	count(*) as pendientes,u.nombre
                FROM seguimiento s INNER JOIN usuarios u  ON s.derivado_a=u.id
                WHERE s.id_a_oficina='$id' 
                AND s.estado ='2'
                AND u.habilitado='1'
                GROUP BY u.nombre";
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    //administracion
    public function listaUsuarios($id) {

        $sql = "SELECT u.id,u.dependencia,u.username,u.nombre,u.paterno,u.materno,u.cargo,u.email,u.genero,u.logins,u.last_login,o.oficina,e.sigla,e.sigla as entidad,u.habilitado,n.nivel,u.cedula_identidad,u.expedido,u.cite_despacho
                FROM usuarios u INNER JOIN oficinas o ON  u.oficina_id=o.id
                INNER JOIN entidades e ON u.entidad_id=e.id
                INNER JOIN niveles n ON u.nivel=n.id";
        $this->_db = new usuarios();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    //datos de usuario
    public function profileUsuario($id) {
        $sql = "SELECT u.id,u.dependencia,u.username,u.nombre,u.paterno,u.materno,u.cargo,u.email,u.genero,u.logins,u.last_login,o.oficina,e.sigla,e.sigla as entidad,u.habilitado,n.nivel,u.cedula_identidad,u.expedido,u.cite_despacho
                FROM usuarios u INNER JOIN oficinas o ON  u.oficina_id=o.id
                INNER JOIN entidades e ON u.entidad_id=e.id
                INNER JOIN niveles n ON u.nivel=n.id
              WHERE u.id='$id'";
        $this->_db = new usuarios();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

}
