const Activo = require("../models/activos")
const User = require("../models/user")

// Método para registrar un activo para un usuario específico
const registrarActivo = async (req, res) => {
  try {
    let params = req.body;
    // Verifica si el usuario existe
    const usuario = await User.findOne({nick: params.nick});
    if (!usuario) {
        return res.status(404).send({
            message: "No se encotro Usuario",
            status:"error"
        })
    }
    

    // Crea un nuevo activo
    const nuevoActivo = new Activo({
      name: params.name,
      description:params.description,
      subCategoria:params.subCategoria,

    });
    nuevoActivo.save().then(async (activoStored) => {
        if (!activoStored) {
          return res.status(500).json({
            status: "failed",
            message: "Usuario no registrado",
          });
        }
        return res.status(200).json({
          status: "succes",
          message: "Usuario registado correctamente",
        });
      });

    // Guarda el activo en la base de datos

    // Agrega el activo a la lista de activos del usuario
    usuario.activos.push(nuevoActivo);
     usuario.save();

    return nuevoActivo;
  } catch (error) {
    throw new Error(`Error al registrar el activo: ${error.message}`);
  }
};

module.exports = {
    registrarActivo,
  };