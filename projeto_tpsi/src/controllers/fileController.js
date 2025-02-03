
// const path = require('path');
// const multer = require('multer');
// const fs = require('fs');
// const db = require("../database");

// // Caminho para armazenar os arquivos
// const uploadDir = path.join(__dirname, '..', 'uploads', 'relatorios');

// // Garantir que o diretório de uploads existe
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configuração do armazenamento dos uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname);
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

// // Função para fazer upload do relatório
// const fazerUpload = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
//     }

//     const { numDefesa, userId } = req.body;

//     if (!userId) {
//         return res.status(403).json({ message: 'ID do usuário não foi enviado.' });
//     }

//     const id_user = Number(userId);
//     const filePath = `/uploads/relatorios/${req.file.filename}`; // Caminho correto para salvar no BD

//     // Buscar id_juri baseado no id_user
//     const queryJuri = "SELECT id_juri FROM juri WHERE id_user = ?";
//     db.query(queryJuri, [id_user], (err, results) => {
//         if (err) {
//             console.error('Erro ao buscar id_juri:', err);
//             return res.status(500).json({ message: 'Erro ao obter dados do juri.' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Júri não encontrado para este usuário.' });
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
// };

// // Exportar funções para serem usadas no servidor
// module.exports = { baixarTemplate, fazerUpload, upload };
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require("../database");

// Criar diretórios se não existirem
const createUploadDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Definir diretórios
const uploadDirRelatorios = path.join(__dirname, '..', 'uploads', 'relatorios');
const uploadDirAtas = path.join(__dirname, '..', 'uploads', 'atas');

createUploadDir(uploadDirRelatorios);
createUploadDir(uploadDirAtas);

// Configuração do armazenamento dos uploads
const storageConfig = (uploadDir) => multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Configuração do multer
const uploadRelatorios = multer({ storage: storageConfig(uploadDirRelatorios) });
const uploadAtas = multer({ storage: storageConfig(uploadDirAtas) });

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

// Função para upload de relatórios
const fazerUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const { numDefesa, userId } = req.body;
    if (!userId) {
        return res.status(403).json({ message: 'ID do usuário não foi enviado.' });
    }

    const id_user = Number(userId);
    const filePath = `/uploads/relatorios/${req.file.filename}`;

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

        // Inserir o relatório no banco
        const sql = `INSERT INTO avaliacao (id_juri, id_tese, doc_avaliacao) VALUES (?, ?, ?)`;
        db.query(sql, [id_juri, numDefesa, filePath], (err, result) => {
            if (err) {
                console.error('Erro ao salvar relatório no banco de dados:', err);
                return res.status(500).json({ message: 'Erro ao salvar relatório no banco de dados.' });
            }
            res.json({ message: 'Upload de relatório realizado com sucesso!' });
        });
    });
};

// Função para upload de atas (UPDATE em vez de INSERT)
const fazerUploadAta = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const { numDefesa } = req.body;
    if (!numDefesa) {
        return res.status(400).json({ message: 'ID da tese não foi enviado.' });
    }

    const filePath = `/uploads/atas/${req.file.filename}`;

    // Atualizar a ata na tabela defesa
    const sql = `UPDATE defesa SET ata = ? WHERE id_tese = ?`;
    db.query(sql, [filePath, numDefesa], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar ata no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao atualizar ata no banco de dados.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nenhuma defesa encontrada para atualizar a ata.' });
        }
        res.json({ message: 'Upload de ata realizado com sucesso!' });
    });
};

// Exportar funções para serem usadas no servidor
module.exports = { baixarTemplate, fazerUpload, fazerUploadAta, uploadRelatorios, uploadAtas };
