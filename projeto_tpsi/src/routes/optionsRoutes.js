const express = require("express");
const router = express.Router();
const optionController = require("../controllers/optionController");

router.get("/option_curso", optionController.option_Cursos);
router.get("/option_tipos-utilizado", optionController.option_TipoUser);
 router.get("/option_polo", optionController.option_Polo);
router.get("/option_coordenador",optionController.getCoordenador);
router.get("/option_orientador",optionController.getOrientador);
router.get("/option_alunos",optionController.getAlunos);
module.exports = router;