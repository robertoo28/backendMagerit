const express = require("express");
const router = express.Router();
const ActivosController = require("../controllers/activos");

router.post("/registrar", ActivosController.registrarActivo);

module.exports = router;
