const multer = require('multer');
const path = require('path');
const db = require("../database");


exports.update_tese = async (req, res) => {
    try {
        const { userId, status, title, description, thesisFile, fileName } = req.body;

        console.log("Dados recebidos:", req.body);

        // --- Validação de Campos ---
        const camposFaltando = [];
        if (!userId) camposFaltando.push("userId");
        if (!title) camposFaltando.push("title");
        if (!status) camposFaltando.push("status");
        if (!thesisFile) camposFaltando.push("thesisFile");
        if (!fileName) camposFaltando.push("fileName");

        if (camposFaltando.length > 0) {
            return res.status(400).json({
                message: `Campos obrigatórios faltando: ${camposFaltando.join(", ")}`
            });
        }

        // Decodifica o arquivo Base64
        const fileBuffer = Buffer.from(thesisFile, "base64");

        // Define o nome do arquivo como id_tese (usando o userId ou outra lógica para id_tese)
        const idTese = userId; // Substituir se `id_tese` for diferente de `userId`
        const fileExtension = fileName.split('.').pop(); // Obtém a extensão do arquivo
        const savedFileName = `${idTese}_tese.${fileExtension}`; // Nomeia o arquivo com id_tese
        const filePath = `uploads/teses/${savedFileName}`;

        // Salva o arquivo no sistema de arquivos apenas uma vez
        const fs = require("fs");
        if (!fs.existsSync("uploads/teses")) {
            fs.mkdirSync("uploads/teses", { recursive: true });
        }
        fs.writeFileSync(filePath, fileBuffer);

        console.log("Arquivo salvo em:", filePath);

        // Atualizar a tese no banco de dados
        const query = `
            UPDATE tese
            SET tema = ?, status = ?, data_submissao = ?, doc_tese = ?
            WHERE id_aluno = ?
        `;
        const values = [
            title,
            status,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            filePath,
            userId,
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Erro ao atualizar a tese:", err);
                return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
            }

            res.status(200).json({ message: "Tese atualizada com sucesso!" });
        });
    } catch (err) {
        console.error("Erro no processo de atualização da tese:", err);
        res.status(500).json({ message: err.message });
    }
};