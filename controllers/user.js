const User = require("../models/user");
const Activo = require("../models/activos")


const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
const prueba = (req, res) => {
    return res.status(200).send({
      messagge: "Mensaje enviado desde usuario",
      usuario:req.user
    });
  };

const register = async (req, res) => {
    //Recoger datos de la petición
  
    let params = req.body;
  
    //Comprobar que me llegan
  
    if (!params.name || !params.email || !params.password || !params.nick) {
      return res.status(400).json({
        error: "Faltan parametros",
        params,
      });
    }
  
    //Control de usuarios duplicados
    console.log(
      "Buscando usuario con el correo electrónico: " + params.email.toLowerCase()
    );
    let userFoundByEmail = await User.findOne({
      email: params.email.toLowerCase(),
    }).exec();
    console.log(
      "Resultado de la búsqueda por correo electrónico: ",
      userFoundByEmail
    );
  
    console.log("Buscando usuario con el apodo: " + params.nick.toLowerCase());
  
    let userFoundByNick = await User.findOne({
      nick: params.nick.toLowerCase(),
    }).exec();
    console.log("Resultado de la búsqueda por apodo: ", userFoundByNick);
    if (userFoundByEmail || userFoundByNick) {
      return res.status(200).send({
        status: "Succes",
        message: "El usuario ya existe",
      });
    }
    //Cifrar contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;
    //Crear objeto de usuario
    let userToSave = new User(params);
  
    //Guardar usuario en la bdd
  
    userToSave.save().then(async (userStored) => {
      if (!userStored) {
        return res.status(500).json({
          status: "failed",
          message: "Usuario no registrado",
        });
      }
      return res.status(200).json({
        status: "succes",
        message: "Usuario registado correctamente",
        user: userStored,
      });
    });
  };
  const login = (req, res) => {
    //Recoger parametros
    const params = req.body;
    if (!params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datazos",
      });
    }
  
    //Buscar en la bdd si existe
    User.findOne({ email: params.email })
      //.select({ password: 0 })
      .exec()
      .then((user) => {
        if (!user)
          return res
            .status(404)
            .send({ status: "error", message: "No existe el usuario" });
        //Comprobar su contraseña
        let pwd =bcrypt.compareSync(params.password, user.password)
        if(!pwd){
          return res.status(400).send({
            error: "No te validaste bien"
  
          })
        }
  
        //Devolver token
        const token = jwt.createToken(user);
  
        //devolver datos de usuario
        return res.status(200).send({
          status: "succes",
          message: "Te has identificado correctamente",
          user:{
            name: user.name,
            nick:user.nick,
            id:user._id
          },
          token
  
        });
      });
  };
//Metodo para mostrar activos asociados a un empleado
  const mostrarActivos =  async (req,res)=>{
    try {
      let params = req.body
    const usuario =  await User.findOne({nick : params.nick}).exec();
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve la lista de activos asociados al usuario
    return res.status(200).json(usuario.activos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los activos del usuario', error: error.message });
  }
  }

  //Metodo para sacar una lista de usuarios

  const mostrarUsuarios = async (req,res) =>{
    try{
    const todos = await User.find().select('-_id name');
    return res.status(200).json(todos);
  }catch(error){
    return res.status(500).json({ message: "Error al obtener la lista de usuarios", error });
  }

  }

  module.exports = {
    prueba,
    register,
    login,
    mostrarActivos,
    mostrarUsuarios,
  };