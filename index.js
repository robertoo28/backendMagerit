const { connection } = require("./database/conection");
const express = require("express");
const cors = require("cors");
//Mensaje de bienvenida

console.log("Conectado A LA RED SOCIAL");
//COnexion a la bdd
connection();

//Crear servidor node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());

//Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cargar conf rutas
const userRoutes = require("./routes/user");
const activosRoutes = require("./routes/activos")

app.use("/api/user", userRoutes);
app.use("/api/activos", activosRoutes)

app.listen(puerto, () => {
    console.log("Servidor corriendo en " + puerto);
  });
  