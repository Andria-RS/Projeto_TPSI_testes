
const bcrypt = require("bcryptjs");
const db = require("../database");

// Controlador de registro
exports.register = async (req, res) => {
  const { nome, email, password, contacto } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data_registo = new Date().toISOString().split("T")[0]; // data atual no formato YYYY-MM-DD



  db.query(
    
    "INSERT INTO Users (nome, email, password, contacto, data_registo) VALUES (?, ?, ?, ?, ?)",
    [nome, email, hashedPassword, contacto, data_registo],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "O email já está em uso." });
        }
        return res.status(500).json({ message: "Erro ao registrar o usuário: " + err.message });
      }
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    }
  );
};

// Controlador de login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar o usuário." });
    const user = results[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Email ou senha inválidos." });
    }

    db.query("SELECT id_tipo_utilizador FROM Users WHERE id_user = ?", [user.id_user], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar o tipo de utilizador." });
      const tipo_utilizador = result[0].id_tipo_utilizador;

      req.session.userId = user.id_user;
      req.session.tipoUtilizador = tipo_utilizador;

      res.status(200).json({ message: "Login bem-sucedido", userId: user.id_user, tipoUtilizador: tipo_utilizador });
    });
  });
};

// Controlador de logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao fazer logout." });
    }
    res.status(200).json({ message: "Logout realizado com sucesso!" });
  });
};