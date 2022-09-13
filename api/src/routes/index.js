const { Router } = require('express');
const dogroute = require("./dog")
const temperamentoroute = require("./temperament")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dog", dogroute)
router.use("/temperament", temperamentoroute)

module.exports = router;
