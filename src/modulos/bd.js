// administracio nde la conexion a la BD
// usando CALLBACKS

const mysql = require("mysql2");

const cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "interpolice"
});

cnx.query("SELECT * FROM citizen", (err, results) => {
  console.log(results); // results contains rows returned by server
});


cnx.connect((error) => {
  if (error) {
    console.log(`Error en la conexion: \n ${error}`);
    //throw "error en la conexion a la BD.";
  } else {
    console.log("conexion exitosa a la BD!");
  }
});

module.exports = cnx;
