const mongoose = require("mongoose")

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_magerit");
    console.log("Conectado a la bdd");
  } catch (error) {
    throw new Error("Conexion fallida");
  }
};
module.exports = {
  connection,
};