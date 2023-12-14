//Importar
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta 
const secret ="CLAVE_SECRETA";


//Funcion generar tokens
 const createToken = (user) =>{
    const payload= {
        id: user.__id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.role,
        imagen:user.imagen,
        iat:moment().unix(),
        exp: moment().add(30,"days").unix
    };

    //devovler jwt toke codificado
    return jwt.encode(payload,secret);
}



module.exports = {
    secret,
    createToken

}
