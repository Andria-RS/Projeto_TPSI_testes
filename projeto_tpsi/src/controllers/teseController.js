
// // // const path = require("path");
// // // const fs = require("fs");
// // // const multer = require("multer");
// // // const db = require("../database");

// // // // Configuração do multer para armazenar os arquivos na pasta 'uploads/teses'
// // // const storage = multer.diskStorage({
// // //     destination: (req, file, cb) => {
// // //         const uploadDir = "uploads/teses";
// // //         if (!fs.existsSync(uploadDir)) {
// // //             fs.mkdirSync(uploadDir, { recursive: true });
// // //         }
// // //         cb(null, uploadDir); // Caminho onde o arquivo será salvo
// // //     },
// // //     filename: (req, file, cb) => {
// // //         console.log("id_1");
        
       
// // //         const userId = req.body.userId;  // Pegue o 'userId' do FormData
// // //         console.log(userId);
// // //         const fileExtension = path.extname(file.originalname).toLowerCase();
// // //         const fileName = `${userId}_tese${fileExtension}`;
// // //         cb(null, fileName);  // Defina o nome do arquivo
// // //     }
// // // });

// // // // Criação do middleware do multer
// // // const upload = multer({ storage: storage }).single('tese');  // 'tese' é o nome do campo no FormData

// // // // Rota de upload da tese
// // // exports.upload_tese = (req, res) => {
// // //     // Use o multer para lidar com o upload do arquivo
// // //     upload(req, res, (err) => {
// // //         if (err) {
// // //             console.error("Erro ao fazer upload:", err);
// // //             return res.status(500).json({ message: "Erro ao fazer upload: " + err.message });
// // //         }

// // //         const { userId } = req.body;
// // //         const file = req.file;

// // //         if (!userId || !file) {
// // //             return res.status(400).json({ message: "userId e tese são obrigatórios." });
// // //         }

// // //         console.log("Arquivo recebido:", file);

// // //         // Atualizar o caminho do PDF no banco de dados
// // //         const filePath = file.path;  // Caminho do arquivo no servidor
// // //         const updateQuery = "UPDATE tese SET doc_tese = ? WHERE id_aluno = ?";
        

// // //         console.log("id_2");
        
// // //         console.log(userId);
// // //         db.query(updateQuery, [filePath, userId], (err, result) => {
// // //             if (err) {
// // //                 console.error("Erro ao atualizar a tese:", err);
// // //                 return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
// // //             }

// // //             if (result.affectedRows === 0) {
// // //                 return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
// // //             }

// // //             res.status(200).json({ message: "Tese atualizada com sucesso!" });
// // //         });
// // //     });
// // // };

// // const path = require("path");
// // const fs = require("fs");
// // const multer = require("multer");
// // const db = require("../database");
// // const express = require("express");

// // // Configuração do multer para armazenar os arquivos na pasta 'uploads/teses'
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         const uploadDir = "uploads/teses";
// //         if (!fs.existsSync(uploadDir)) {
// //             fs.mkdirSync(uploadDir, { recursive: true });
// //         }
// //         cb(null, uploadDir); // Caminho onde o arquivo será salvo
// //     },
// //     filename: (req, file, cb) => {
// //         // Verifique o userId aqui
// //         console.log("id_1");
        
// //         const userId = req.body.userId;  // Pegue o 'userId' do FormData
// //         console.log("userId na função filename:", userId); // Isso deve ser exibido agora
// //         const fileExtension = path.extname(file.originalname).toLowerCase();
// //         const fileName = `${userId}_tese${fileExtension}`;
// //         cb(null, fileName);  // Defina o nome do arquivo
// //     }
// // });

// // // Criação do middleware do multer
// // const upload = multer({ storage: storage }).single('tese');  // 'tese' é o nome do campo no FormData

// // // Rota de upload da tese
// // exports.upload_tese = (req, res) => {
// //     // Use o multer para lidar com o upload do arquivo
// //     upload(req, res, (err) => {
// //         if (err) {
// //             console.error("Erro ao fazer upload:", err);
// //             return res.status(500).json({ message: "Erro ao fazer upload: " + err.message });
// //         }

// //         const { userId } = req.body; // Agora deve ter o userId corretamente
// //         const file = req.file;

// //         console.log("userId dentro da rota:", userId); // Verifique se o userId chega aqui
// //         if (!userId || !file) {
// //             return res.status(400).json({ message: "userId e tese são obrigatórios." });
// //         }

// //         console.log("Arquivo recebido:", file);

// //         // Atualizar o caminho do PDF no banco de dados
// //         const filePath = file.path;  // Caminho do arquivo no servidor
// //         const updateQuery = "UPDATE tese SET doc_tese = ? WHERE id_aluno = ?";

// //         db.query(updateQuery, [filePath, userId], (err, result) => {
// //             if (err) {
// //                 console.error("Erro ao atualizar a tese:", err);
// //                 return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
// //             }

// //             if (result.affectedRows === 0) {
// //                 return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
// //             }

// //             res.status(200).json({ message: "Tese atualizada com sucesso!" });
// //         });
// //     });
// // };
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const express = require("express");
// const db = require("../database");

// const app = express();

// // Middleware para garantir que os dados sejam processados corretamente
// app.use(express.json()); // Processa dados JSON (como userId)
// app.use(express.urlencoded({ extended: true })); // Processa dados URL-encoded, caso use esse método no frontend

// // Configuração do multer para armazenar os arquivos na pasta 'uploads/teses'
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = "uploads/teses";
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir); // Caminho onde o arquivo será salvo
//     },
//     filename: (req, file, cb) => {
//         // Verifique o userId aqui
//         const userId = req.body.userId;  // Pegue o 'userId' do FormData
//         console.log("userId dentro da função filename:", userId); // Isso deve ser exibido agora
//         const fileExtension = path.extname(file.originalname).toLowerCase();
//         const fileName = `${userId}_tese${fileExtension}`;
//         cb(null, fileName);  // Defina o nome do arquivo
//     }
// });

// // Criação do middleware do multer
// const upload = multer({ storage: storage }).single('tese');  // 'tese' é o nome do campo no FormData

// // Rota de upload da tese
// exports.upload_tese = (req, res) => {
//     // Primeiro, faça o processamento do multer
//     upload(req, res, (err) => {
//         if (err) {
//             console.error("Erro ao fazer upload:", err);
//             return res.status(500).json({ message: "Erro ao fazer upload: " + err.message });
//         }

//         const { userId } = req.body; // Agora deve ter o userId corretamente
//         const file = req.file;

//         if (!userId || !file) {
//             return res.status(400).json({ message: "userId e tese são obrigatórios." });
//         }

//         console.log("Arquivo recebido:", file);
//         console.log("userId recebido:", userId); // Verifique se o userId chega aqui

//         // Atualizar o caminho do PDF no banco de dados
//         const filePath = file.path;  // Caminho do arquivo no servidor
//         const updateQuery = "UPDATE tese SET doc_tese = ? WHERE id_aluno = ?";

//         db.query(updateQuery, [filePath, userId], (err, result) => {
//             if (err) {
//                 console.error("Erro ao atualizar a tese:", err);
//                 return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
//             }

//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
//             }

//             res.status(200).json({ message: "Tese atualizada com sucesso!" });
//         });
//     });
// };

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const db = require("../database");

const app = express();

// Middleware para garantir que os dados sejam processados corretamente
app.use(express.json()); // Processa dados JSON (como userId)
app.use(express.urlencoded({ extended: true })); // Processa dados URL-encoded, caso use esse método no frontend

// Configuração do multer para armazenar os arquivos na pasta 'uploads/teses'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/teses";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Caminho onde o arquivo será salvo
    },
    filename: (req, file, cb) => {
        // Manter o nome original do arquivo
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const originalName = path.basename(file.originalname, fileExtension); // Nome original sem a extensão
        const newFileName = `${originalName}${fileExtension}`; // Manter o nome original com a extensão
        cb(null, newFileName);  // Usar o nome original do arquivo
    }
});

// Criação do middleware do multer
const upload = multer({ storage: storage }).single('tese');  // 'tese' é o nome do campo no FormData

// Rota de upload da tese
exports.upload_tese = (req, res) => {
    // Primeiro, faça o processamento do multer
    upload(req, res, (err) => {
        if (err) {
            console.error("Erro ao fazer upload:", err);
            return res.status(500).json({ message: "Erro ao fazer upload: " + err.message });
        }

        const { userId } = req.body; // Agora deve ter o userId corretamente
        const file = req.file;

        if (!userId || !file) {
            return res.status(400).json({ message: "userId e tese são obrigatórios." });
        }

        console.log("Arquivo recebido:", file);
        console.log("userId recebido:", userId); // Verifique se o userId chega aqui

        // Atualizar o caminho do PDF no banco de dados
        const filePath = file.path;  // Caminho do arquivo no servidor
        const updateQuery = "UPDATE tese SET doc_tese = ? WHERE id_aluno = ?";

        db.query(updateQuery, [filePath, userId], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar a tese:", err);
                return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
            }

            res.status(200).json({ message: "Tese atualizada com sucesso!" });
        });
    });
};



exports.download_tese = (req, res) => {
    const { userId } = req.params; // O id_user será passado via parâmetro de rota

    // Verifique se o id_user foi fornecido
    if (!userId) {
        return res.status(400).json({ message: "id_user é obrigatório." });
    }

    // Consulta SQL para obter o caminho do arquivo baseado no userId
    const query = "SELECT doc_tese FROM tese WHERE id_aluno = ?";

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Erro ao consultar a base de dados:", err);
            return res.status(500).json({ message: "Erro ao buscar o arquivo." });
        }

        // Verifique se o arquivo foi encontrado
        if (result.length === 0) {
            return res.status(404).json({ message: "Arquivo não encontrado para o aluno." });
        }

        const filePath = result[0].doc_tese;

        // Verifique se o arquivo realmente existe no servidor
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Arquivo não encontrado no servidor." });
        }

        // Enviar o arquivo para o cliente para download
        res.download(filePath, (err) => {
            if (err) {
                console.error("Erro ao enviar o arquivo:", err);
                return res.status(500).json({ message: "Erro ao enviar o arquivo." });
            }

            console.log(`Arquivo enviado com sucesso: ${filePath}`);
        });
    });
};

// exports.download_tese = (req, res) => {
//     const { userId } = req.params; // O id_user será passado via parâmetro de rota

//     // Verifique se o id_user foi fornecido
//     if (!userId) {
//         return res.status(400).json({ message: "id_user é obrigatório." });
//     }

//     // Consulta SQL para obter o caminho do arquivo baseado no userId
//     const query = "SELECT doc_tese FROM tese WHERE id_aluno = ?";

//     db.query(query, [userId], (err, result) => {
//         if (err) {
//             console.error("Erro ao consultar a base de dados:", err);
//             return res.status(500).json({ message: "Erro ao buscar o arquivo." });
//         }

//         // Verifique se o arquivo foi encontrado
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Arquivo não encontrado para o aluno." });
//         }

//         const filePath = result[0].doc_tese;

//         // Verifique se o arquivo realmente existe no servidor
//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({ message: "Arquivo não encontrado no servidor." });
//         }

//         // Enviar o arquivo para o cliente para download
//         res.download(filePath, (err) => {
//             if (err) {
//                 console.error("Erro ao enviar o arquivo:", err);
//                 return res.status(500).json({ message: "Erro ao enviar o arquivo." });
//             }

//             console.log(`Arquivo enviado com sucesso: ${filePath}`);
//         });
//     });
// };