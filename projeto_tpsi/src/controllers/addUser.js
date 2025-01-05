// const bcrypt = require("bcryptjs");
// const db = require("../database");
// const fs = require("fs");
// const path = require("path");

// // Controlador de registro
// exports.register = async (req, res) => {
//   const { nome, contacto, email, password, curriculo, especialidade, data_registo, id_tipo_utilizador, id_polo } = req.body;

//   // Criptografar a senha
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Foto (caso o upload tenha sido feito)
//   let foto = null;
//   if (req.file) {
//     // Lê a foto enviada e converte em um buffer para salvar no banco de dados como BLOB
//     foto = fs.readFileSync(path.join(__dirname, "../uploads", req.file.filename));
//   }

//   // Query SQL para inserir o novo usuário
//   const query = `
//     INSERT INTO Users (nome, contacto, email, password, curriculo, especialidade, data_registo, id_tipo_utilizador, id_polo, foto)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [nome, contacto, email, hashedPassword, curriculo, especialidade, data_registo, id_tipo_utilizador, id_polo, foto];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       if (err.code === "ER_DUP_ENTRY") {
//         // Se o email já estiver em uso
//         return res.status(400).json({ message: "O email já está em uso." });
//       }
//       return res.status(500).json({ message: "Erro ao registrar o usuário: " + err.message });
//     }

//     res.status(201).json({ message: "Usuário registrado com sucesso!" });
//   });
// };