const fs = require("fs");
const db = require("../database");

exports.upload_tese = async (req, res) => {
    try {
        // Obtém o email da sessão do usuário
        if (!req.session || !req.session.email) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        const email = req.session.email;

        console.log("Email obtido da sessão:", email);

        // Consulta o ID do usuário pelo email
        db.query("SELECT id FROM Users WHERE email = ?", [email], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao buscar usuário." });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const userId = results[0].id;

            // --- Validação de Campos ---
            const { thesisFile, fileName } = req.body;

            if (!thesisFile || !fileName) {
                return res.status(400).json({ message: "Arquivo da tese e nome do arquivo são obrigatórios." });
            }

            // Decodifica o arquivo Base64
            const fileBuffer = Buffer.from(thesisFile, "base64");

            // Define o nome do arquivo com base no ID do usuário
            const fileExtension = fileName.split('.').pop();
            const savedFileName = `${userId}_tese.${fileExtension}`;
            const filePath = `uploads/teses/${savedFileName}`;

            // Salva o arquivo no sistema de arquivos
            if (!fs.existsSync("uploads/teses")) {
                fs.mkdirSync("uploads/teses", { recursive: true });
            }
            fs.writeFileSync(filePath, fileBuffer);

            console.log("Arquivo salvo em:", filePath);

            // Atualiza a tese no banco de dados
            const query = `
                UPDATE tese
                SET doc_tese = ?, status = 'Entregue', data_submissao = CURDATE()
                WHERE id_aluno = ?
            `;
            db.query(query, [filePath, userId], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Erro ao atualizar a tese: " + err.message });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Tese não encontrada para o aluno especificado." });
                }

                res.status(200).json({ message: "Tese atualizada com sucesso!" });
            });
        });
    } catch (err) {
        console.error("Erro no processo de atualização da tese:", err);
        res.status(500).json({ message: err.message });
    }
};
