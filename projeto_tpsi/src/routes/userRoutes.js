const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/tipo-utilizador", userController.getTipoUtilizador);
router.post("/add_user", userController.add_user);
router.get("/getAllUsers", userController.getAllUsers);
router.delete("/delete_user/:id", userController.delete_user);
router.get("/getUserById/:userId", userController.getUserById);
router.put("/edit_user", userController.edit_user);
router.post("/add_course", userController.add_course);
router.get("/getAllUsersbyCordenador", userController.getAllUsersbyCordenador);

module.exports = router;
