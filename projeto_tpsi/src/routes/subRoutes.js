// const express = require('express');
// const router = express.Router();
// const teseController = require('../controllers/teseController'); 
// const fileController = require('../controllers/fileController'); 

// // Rota para salvar a tese no banco de dados
// router.put('/upload_tese', teseController.upload_tese);
// router.get('/download_tese/:userId', teseController.download_tese); // A rota precisa de um parâmetro userId



// router.get('/relatorios/download-template', fileController.baixarTemplate);
// router.post('/relatorios/upload-relatorio', upload.single('file'), fileController.fazerUpload);
// module.exports = router;
const express = require('express');
const router = express.Router();
const teseController = require('../controllers/teseController'); 
const fileController = require('../controllers/fileController'); 
const { upload } = require('../controllers/fileController'); // Importando o middleware de upload

// Rota para salvar a tese no banco de dados
router.put('/tese/upload', teseController.upload_tese);

// Rota para baixar uma tese pelo ID do usuário
router.get('/tese/download/:userId', teseController.download_tese);

// Rotas para download e upload de relatórios
router.get('/relatorios/download-template', fileController.baixarTemplate);
router.post('/relatorios/upload-relatorio', upload.single('file'), fileController.fazerUpload);

module.exports = router;
