// Modulo para administrar la info de los ciudad
const express = require("express");
const bd = require("./bd.js"); //--problema
const citizen = express();
// TRAER TODOS LOS CIUDADANOS
citizen.get("/api/citizen/listartodos",(req,res)=>{
    let consulta = "SELECT * FROM ciudadanos ORDER BY ApodoCiu ASC";
    bd.query(consulta,(error,citizen)=>{
        if(error){
            res.send({
                status: "error",
                mensaje: "ocurrio un error en la consulta !",
                error: error
            });
        }else {
            res.send({
                status: "ok",
                mensaje : "consulta Exitosa",
                citizen: citizen
            });
        }
    });
});
// BUSCAR POR ID
citizen.get("/api/citizen/listarporid/:id",(req,res)=>{
    let id = req.params.id;

    let consulta = "SELECT * FROM ciudadanos WHERE IdCiu = ?";
    bd.query(consulta,[id],(error,citizen)=>{
        if(error){
            res.send({
                status: "error",
                mensaje: "ocurrio un error en la consulta !",
                error: error
            });
        } else {
            res.send({
                status: "ok",
                mensaje: "consulta exitosa",
                citizen: citizen
            });
        }
    });
});
// CONSULTAR POR APODO
citizen.get("/api/citizen/listarpoapodo/:apodo", (req, res) => {
  let apodo = req.params.apodo;
  let consulta = "SELECT * FROM ciudadanos where ApodoCiu  = ? ";
  bd.query(consulta, [apodo], (error, citizen) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        citizen: citizen
      });
    }
  });
});
// ELIMINAR CIUDADANOS
citizen.delete("/api/citizen/borrarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE  FROM ciudadanos WHERE IdCiu = ? ";

  bd.query(consulta, [id], (error, citizen) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Registro Borrado con exito !",
        citizen: citizen
      });
    }
  });
});
// CREAR CIUDADANO
citizen.post("/api/citizen/crear", (req, res) => {
  let frmDatos = {
    documento: req.body.documento,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    apodo: req.body.apodo,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento
  };
  let consulta = "INSERT INTO ciudadanos SET ?";
  bd.query(consulta, [frmDatos], (error, respuesta) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Ciudadano Agregado exitosamente",
        respuesta: respuesta
      });
    }
  });
});
//EDITAR UN CIUDADANO
citizen.put("/api/citizen/editarporid/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    documento: req.body.documento,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    apodo: req.body.apodo,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento
  };
  let consulta = "UPDATE ciudadanos SET ? WHERE id = ?";
  bd.query(consulta, [frmDatos, id], (error, citizen) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Actualizacion exitosa!",
        citizen: citizen
      });
    }
  });
});

module.exports = citizen;