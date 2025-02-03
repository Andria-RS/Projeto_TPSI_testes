// const path = require('path');
// const multer = require('multer');
// const db = require("../database");

// // Configuração do armazenamento dos uploads
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '..', 'uploads', 'relatorios'),
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage });

// // Função para baixar o template
// const baixarTemplate = (req, res) => {
//     const filePath = path.join(__dirname, '..', '..', 'public', 'aplicacao', 'assets', 'files', 'template_relatorio.pdf');
//     res.download(filePath, 'template_relatorio.pdf', (err) => {
//         if (err) {
//             console.error('Erro no download:', err);
//             res.status(500).send('Erro ao baixar o arquivo.');
//         }
//     });
// };

// // Função para fazer upload do relatórioconst fazerUpload = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
//     }

//     const { numDefesa, userId } = req.body; // Agora pegamos userId do FormData

//     if (!userId) {
//         return res.status(403).json({ message: 'ID do usuário não foi enviado.' });
//     }

//     const id_user = Number(userId); // Garantir que seja um número
//     const filePath = `/src/uploads/relatorios/${req.file.filename}`;

//     // Buscar id_juri a partir do id_user
//     const queryJuri = "SELECT id_juri FROM juri WHERE id_user = ?";
//     db.query(queryJuri, [id_user], (err, results) => {
//         if (err) {
//             console.error('Erro ao buscar id_juri:', err);
//             return res.status(500).json({ message: 'Erro ao obter dados do juri.' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Juri não encontrado para este usuário.' });
//         }

//         const id_juri = results[0].id_juri;

//         // Inserir no banco de dados
//         const sql = `INSERT INTO avaliacao (id_juri, id_tese, doc_avaliacao) VALUES (?, ?, ?)`;
//         db.query(sql, [id_juri, numDefesa, filePath], (err, result) => {
//             if (err) {
//                 console.error('Erro ao salvar no banco de dados:', err);
//                 return res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
//             }
//             res.json({ message: 'Upload realizado com sucesso!' });
//         });
//     });


// // Exportar funções para serem usadas no servidor
// module.exports = { fazerUpload };
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require("../database");

// Caminho para armazenar os arquivos
const uploadDir = path.join(__dirname, '..', 'uploads', 'relatorios');

// Garantir que o diretório de uploads existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento dos uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Função para baixar o template
const baixarTemplate = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'public', 'aplicacao', 'assets', 'files', 'template_relatorio.pdf');
    res.download(filePath, 'template_relatorio.pdf', (err) => {
        if (err) {
            console.error('Erro no download:', err);
            res.status(500).send('Erro ao baixar o arquivo.');
        }
    });
};

// Função para fazer upload do relatório
const fazerUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const { numDefesa, userId } = req.body;

    if (!userId) {
        return res.status(403).json({ message: 'ID do usuário não foi enviado.' });
    }

    const id_user = Number(userId);
    const filePath = `/uploads/relatorios/${req.file.filename}`; // Caminho correto para salvar no BD

    // Buscar id_juri baseado no id_user
    const queryJuri = "SELECT id_juri FROM juri WHERE id_user = ?";
    db.query(queryJuri, [id_user], (err, results) => {
        if (err) {
            console.error('Erro ao buscar id_juri:', err);
            return res.status(500).json({ message: 'Erro ao obter dados do juri.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Júri não encontrado para este usuário.' });
        }

        const id_juri = results[0].id_juri;

        // Inserir no banco de dados
        const sql = `INSERT INTO avaliacao (id_juri, id_tese, doc_avaliacao) VALUES (?, ?, ?)`;
        db.query(sql, [id_juri, numDefesa, filePath], (err, result) => {
            if (err) {
                console.error('Erro ao salvar no banco de dados:', err);
                return res.status(500).json({ message: 'Erro ao salvar no banco de dados.' });
            }
            res.json({ message: 'Upload realizado com sucesso!' });
        });
    });
};

// Exportar funções para serem usadas no servidor
module.exports = { baixarTemplate, fazerUpload, upload };
