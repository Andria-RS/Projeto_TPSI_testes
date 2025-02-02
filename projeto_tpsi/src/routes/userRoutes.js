const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const teseController = require("../controllers/teseController");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/tipo-utilizador", userController.getTipoUtilizador);
router.post("/add_user", userController.add_user);
router.get("/getAllUsers", userController.getAllUsers);
router.delete("/delete_user/:id", userController.delete_user);
router.get("/getUserById/:userId", userController.getUserById);
router.put("/edit_user", userController.edit_user);
router.post("/add_course", userController.add_course);
router.get("/getAllUsersbyCordenador", userController.getAllUsersbyCordenador);
router.post("/add_tese", userController.add_tese);
router.put("/submit-document", teseController.update_tese);

//router.post("/submit-evaluation", teseController.createEvaluation);
router.get("/getUserPerfil/:userId", userController.getUserPerfil);

router.get("/getInfoToCordenador", userController.getInfoToCordenador);
router.get("/getInfoToOrientador", userController.getInfoToOrientador);

module.exports = router;
