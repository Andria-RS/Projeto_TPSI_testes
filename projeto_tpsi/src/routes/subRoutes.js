const express = require('express');
const router = express.Router();
const teseController = require('../controllers/teseController'); 

// Rota para salvar a tese no banco de dados
router.put('/upload_tese', teseController.upload_tese);
router.get('/download_tese/:userId', teseController.download_tese); // A rota precisa de um parâmetro userId

module.exports = router;
