const { Schema, model } = require("mongoose");
const User = require("./user"); // Importa el modelo de Usuario

// Define el esquema de Activo

const ActivoSchema = Schema({
  nameActive: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subCategoria: {
    type: String,
    requred: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  integridad:{
    type: Number,
  },
  integridad:{
    type: Number,
  },
  confidencialidad:{
    type: Number,
  },
  disponibilidad:{
    type: Number,
  },
  }
);

module.exports = model("Activo", ActivoSchema, "activos");
