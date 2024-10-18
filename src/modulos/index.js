const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/",require("./citizen.js")); //posible problema, en caso de no funcionar

app.listen(4100,()=>{
    console.log(`Api rest encendida en el puerto 4100`);
})