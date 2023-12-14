const { Schema, model } = require("mongoose");
const User = require("./user"); // Importa el modelo de Usuario

// Define el esquema de Activo

const ActivoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subCategoria:{
    type: String,
    requred:true,
  }
  ,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // Otros campos relacionados con el activo, si los hay.
});

module.exports = model("Activo", ActivoSchema, "activos");
