const db = require("../database");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const multer = require('multer');




// Controlador de verificação de tipo de utilizador
exports.getTipoUtilizador = (req, res) => {
  if (req.session.userId) {
    db.query("SELECT id_tipo_utilizador FROM Users WHERE id_user = ?", [req.session.userId], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao verificar tipo de utilizador." });
      res.status(200).json({ tipoUtilizador: result[0].id_tipo_utilizador });
    });
  } else {
    res.status(401).json({ message: "Usuário não autenticado." });
  }
};

// Controlador para obter todos os utilizadores
exports.getAllUsers = (req, res) => {
  if (req.session.userId) {
    const query = `
      SELECT 
        u.id_user,
        u.nome,
        u.email,
        u.contacto,
        u.curriculo,
        u.especialidade,
        t.designacao AS Tipo_utilizador,
        p.designacao AS Polo
      FROM 
        Users u
      JOIN 
        Tipo_Utilizador t ON u.id_tipo_utilizador = t.id_tipo_utilizador
      JOIN 
        Polo p ON u.id_polo = p.id_polo;
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao buscar os dados dos utilizadores.", error: err });
      }
      res.status(200).json(results);
    });
  } else {
    res.status(401).json({ message: "Usuário não autenticado." });
  }
};



// --- Configuração do Upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Definindo a pasta de destino com base no tipo de arquivo
    const uploadPath = file.fieldname === 'curriculo' ? 'uploads/curriculos' : 'uploads/fotos';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Renomeando o arquivo para o email do usuário (garantindo que seja único)
    const ext = path.extname(file.originalname).toLowerCase();
    const email = req.body.email; // Usando o e-mail fornecido no formulário
    const fileName = `${email}${ext}`; // O nome do arquivo será o e-mail + a extensão original
    cb(null, fileName);
  }
});

// --- Filtro de Tipo de Arquivo ---
const fileFilter = (req, file, cb) => {
  const fotoTypes = /jpeg|jpg|png|gif/;
  const curriculoTypes = /pdf/;

  if (file.fieldname === 'foto' && fotoTypes.test(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'curriculo' && curriculoTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Formato de arquivo inválido. Permitidos: .jpeg, .jpg, .png, .gif (foto) e .pdf (curriculo)`));
  }
};

// --- Configuração do multer ---
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter,
});

exports.add_user = [
  // Middleware do multer para upload de arquivos
  upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'curriculo', maxCount: 1 }
  ]),

  async (req, res) => {
    try {
      const { 
        nome, 
        contacto, 
        email, 
        password, 
        especialidade = null, 
        id_tipo_utilizador, 
        id_polo, 
        curso 
      } = req.body;

      // Preenche data_registo
      const data_registo = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // --- Validação de Campos ---
      const camposFaltando = [];
      if (!nome) camposFaltando.push("nome");
      if (!contacto) camposFaltando.push("contacto");
      if (!email) camposFaltando.push("email");
      if (!password) camposFaltando.push("password");
      if (!id_tipo_utilizador) camposFaltando.push("id_tipo_utilizador");
      if (!id_polo) camposFaltando.push("id_polo");
      
      if (camposFaltando.length > 0) {
        return res.status(400).json({
          message: `Campos obrigatórios faltando: ${camposFaltando.join(", ")}`
        });
      }

      // Criptografando a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Caminhos de arquivos
      let fotoPath = null;
      if (req.files && req.files['foto']) {
        console.log("Foto recebida:", req.files['foto']);
        fotoPath = `/uploads/fotos/${req.files['foto'][0].filename}`;
      } else {
        console.log("Nenhuma foto enviada.");
      }

      let curriculoPath = null;
      if (req.files && req.files['curriculo']) {
        console.log("Currículo recebido:", req.files['curriculo']);
        curriculoPath = `/uploads/curriculos/${req.files['curriculo'][0].filename}`;
      } else {
        console.log("Nenhum currículo enviado.");
      }

      // Verificar se o email já existe
      db.query("SELECT * FROM Users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Erro ao verificar email." });
        if (results.length > 0) {
          return res.status(400).json({ message: "O email já está em uso." });
        }

        // Inserção do usuário
        const query = `
          INSERT INTO Users (nome, contacto, email, password, curriculo, especialidade, data_registo, id_tipo_utilizador, id_polo, id_curso, foto)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [nome, contacto, email, hashedPassword, curriculoPath, especialidade, data_registo, id_tipo_utilizador, id_polo, curso, fotoPath];

        db.query(query, values, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Erro ao registrar o usuário: " + err.message });
          }

          res.status(201).json({ message: "Usuário registrado com sucesso!" });
        });
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];


// Excluir usuário --------------------------------------
exports.delete_user = (req, res) => {
 // const userId = req.params.id;
 
 let userId = req.params.id;

  // Verificar se o usuário está autorizado a excluir
  db.query('SELECT id_tipo_utilizador FROM Users WHERE id_user = ?', [req.session.userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Erro ao verificar permissões." });

    if (result[0].id_tipo_utilizador !== 1) {  // Supondo que 1 seja o tipo de usuário administrador
      return res.status(403).json({ message: "Usuário não tem permissão para excluir." });
    }

    // Executar exclusão
    const query = 'DELETE FROM Users WHERE id_user = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Erro ao excluir usuário:', err);
        return res.status(500).json({ message: 'Erro ao excluir usuário' });
      }
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    });
  });
};

//------------------------------------------------
exports.getUserById = (req, res) => {
  if (req.session.userId) {
    let id_user  = req.params.userId;


    const query = `
         SELECT 
        u.id_user,
        u.nome,
        u.email,
        u.contacto,
        u.curriculo,
        u.especialidade,
       DATE_FORMAT(u.data_registo, '%Y-%m-%d') AS data_registo, 
        t.id_tipo_utilizador AS Tipo_utilizador,
        p.id_polo AS Polo
      FROM 
        Users u
      JOIN 
        Tipo_Utilizador t ON u.id_tipo_utilizador = t.id_tipo_utilizador
      JOIN 
        Polo p ON u.id_polo = p.id_polo
      WHERE 
        u.id_user = ?;
    `;


    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("Erro ao buscar os dados do usuário:", err);
        return res.status(500).json({ message: "Erro ao buscar os dados do usuário.", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json(results[0]);
    });
  } else {
    res.status(401).json({ message: "Usuário não autenticado." });
  }
};

//---------------------------------------------------


exports.edit_user = (req, res) => {
  const { id_user, nome, contacto, email, password, curriculo, especialidade, id_polo,  tipo_User, data } = req.body;
  console.log(req.body);

  if (!id_user) {
    return res.status(400).json({ message: "ID do usuário é obrigatório." });
  }

  const fieldsToUpdate = [
    { field: "nome", value: nome },
    { field: "contacto", value: contacto },
    { field: "email", value: email },
    { field: "curriculo", value: curriculo },
    { field: "especialidade", value: especialidade },
    { field: "data_registo", value: data },
    { field: "id_polo", value: id_polo },
    { field: "id_tipo_utilizador", value:  tipo_User }
  ];

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao fazer o hash da senha:", err);
        return res.status(500).json({ message: "Erro ao processar senha." });
      }

      fieldsToUpdate.push({ field: "password", value: hashedPassword });
      updateUser();
    });
  } else {
    updateUser();
  }
  
  //-------------------------------------

  function updateUser() {
    const updates = fieldsToUpdate.map(f => `${f.field} = ?`).join(", ");
    const values = fieldsToUpdate.map(f => f.value);
    const query = `
      UPDATE Users
      SET ${updates}
      WHERE id_user = ?;
    `;
    values.push(id_user);

    // Usando o modelo de callback para consulta
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ message: "Erro interno no servidor." });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
      } else {
        return res.status(404).json({ message: "Usuário não encontrado ou sem alterações realizadas." });
      }
    });
  }
};
//------------------------------------------


// Endpoint para adicionar um curso
exports.add_course = [
  upload.none(), // Middleware para processar campos de texto no FormData
  async (req, res) => {
    const { nome_mestrado, nome_orientador, id_polo } = req.body;
    console.log("Controlador ativado");
    console.log("Dados recebidos:", req.body);

    // Verificar se todos os campos obrigatórios foram preenchidos
    const camposFaltando = [];
    if (!nome_mestrado) camposFaltando.push("nome_mestrado");
    if (!nome_orientador) camposFaltando.push("nome_orientador");
    if (!id_polo) camposFaltando.push("id_polo");

    if (camposFaltando.length > 0) {
      return res.status(400).json({
        message: `Por favor, preencha todos os campos obrigatórios. Campos faltando: ${camposFaltando.join(", ")}.`
      });
    }

    // Verificar se o curso já existe (opcional, caso o nome do curso deva ser único)
    db.query(
      "SELECT * FROM Cursos WHERE designacao = ? AND id_polo_escolar = ?",
      [nome_mestrado, id_polo],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao verificar curso existente." });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Este curso já foi cadastrado para o polo selecionado." });
        }

        // Query SQL para inserir o novo curso
        const query = `
          INSERT INTO Cursos (designacao, id_coordenador_curso, id_polo_escolar)
          VALUES (?, ?, ?)
        `;
        const values = [nome_mestrado, nome_orientador, id_polo];

        db.query(query, values, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Erro ao registrar o curso: " + err.message });
          }

          res.status(201).json({ 
            success: true,
            message: "Curso adicionado com sucesso!" 
          });
        });
      }
    );
  }
];

// Controlador para obter todos os utilizadores associados ao coordenador logado
exports.getAllUsersbyCordenador = (req, res) => {

 
  if (req.session.userId) {
    const userId = req.session.userId; // Obtém o ID do usuário logado da sessão
    
    // Primeiro, obtemos o curso associado ao coordenador logado
    const queryCurso = ` SELECT id_curso FROM Users WHERE id_user = ?`;
   
   
    db.query(queryCurso, [userId], (err, cursoResult) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao buscar o curso do coordenador.", error: err });
      }

      if (cursoResult.length === 0) {
        return res.status(404).json({ message: "Nenhum curso associado ao coordenador." });
      }

      const idCurso = cursoResult[0].id_curso;
      

      // Agora, buscamos os usuários do curso associado
      const query = `
        SELECT 
            u.id_user,
            u.nome,
            u.email,
            u.contacto,
            u.curriculo,
            u.especialidade,
            t.designacao AS Tipo_utilizador,
            p.designacao AS Polo
        FROM 
            Users u
        JOIN 
            Tipo_Utilizador t ON u.id_tipo_utilizador = t.id_tipo_utilizador
        JOIN 
            Polo p ON u.id_polo = p.id_polo
        WHERE 
            u.id_tipo_utilizador = 2 AND u.id_curso = ?
      `;
     
      db.query(query, [idCurso], (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao buscar os dados dos utilizadores.", error: err });
        }
        res.status(200).json(results);
      });
    });
  } else {
    res.status(401).json({ message: "Usuário não autenticado." });
  }
};


exports.add_tese = [
  async (req, res) => {
    console.log("Recebendo no req.body:", req.body); // Log inicial para depuração

    try {
      // Verifica se o corpo da requisição contém JSON válido
      if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
          message: "O corpo da requisição deve ser um objeto JSON válido.",
        });
      }

      // Desestruturação de campos do corpo da requisição
      const {
        tema,
        descricao,
        status,
        data_submissao,
        id_aluno,
        id_orientador,
        id_coordenador,
      } = req.body;

      console.log("ENTREI NO CONTROLADOR");
      console.log("Dados recebidos (req.body):", req.body);

      // --- Validação de Campos ---
      const camposFaltando = [];

      // Verificação de campos obrigatórios
      if (!tema || tema.trim() === "") camposFaltando.push("tema");
      if (!status || status.trim() === "") camposFaltando.push("status");
      if (!id_aluno || id_aluno.trim() === "") camposFaltando.push("id_aluno");
      if (!id_orientador || id_orientador.trim() === "") camposFaltando.push("id_orientador");
      if (!id_coordenador || id_coordenador.trim() === "") camposFaltando.push("id_coordenador");

      // Retorna erro caso algum campo obrigatório esteja faltando
      if (camposFaltando.length > 0) {
        return res.status(400).json({
          message: `Campos obrigatórios faltando: ${camposFaltando.join(", ")}`,
        });
      }

      // --- Preparação para inserção no banco de dados ---
      const query = `
        INSERT INTO tese (tema, descricao, status, data_submissao, id_aluno, id_orientador, id_coordenador)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        tema,
        descricao || null, // Permite que 'descricao' seja nulo
        status,
        data_submissao || null, // Permite que 'data_submissao' seja nulo
        id_aluno,
        id_orientador,
        id_coordenador,
      ];

      console.log("Preparando a query SQL:", query);
      console.log("Valores para inserção:", values);

      // Execução da query no banco de dados
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Erro ao executar a query:", err.message);
          return res.status(500).json({
            message: "Erro ao registrar a tese: " + err.message,
          });
        }

        console.log("Tese registrada com sucesso. ID:", result.insertId);
        res.status(201).json({ message: "Tese adicionada com sucesso!" });
      });
    } catch (err) {
      console.error("Erro no controlador:", err.message);
      res.status(500).json({ message: "Erro interno do servidor: " + err.message });
    }
  },
];


exports.getUserPerfil = (req, res) => {
  if (req.session.userId) {
    let id_user = req.params.userId;

    const query = `
         SELECT 
              u.id_user,
              u.nome,
              u.email,
              u.contacto,
              u.curriculo,
              u.especialidade,
              u.foto,
              DATE_FORMAT(u.data_registo, '%Y-%m-%d') AS data_registo, 
              t.id_tipo_utilizador AS Tipo_utilizador,
              p.id_polo AS Polo
          FROM 
              Users u
          LEFT JOIN 
              Tipo_Utilizador t ON u.id_tipo_utilizador = t.id_tipo_utilizador
          LEFT JOIN 
              Polo p ON u.id_polo = p.id_polo
          WHERE 
              u.id_user = ?;
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("Erro ao buscar os dados do usuário:", err);
        return res.status(500).json({ message: "Erro ao buscar os dados do usuário.", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json(results[0]);
    });
  } else {
    res.status(401).json({ message: "Usuário não autenticado." });
  }
};

// // Controlador para obter todos os utilizadores associados ao coordenador logado
// exports.getInfoToCordenador = (req, res) => {
//   if (req.session.userId) {
//     const userId = req.session.userId; // Obtém o ID do usuário logado da sessão
//     console.log("ID do usuário logado (coordenador):", userId);

//     // Primeiro, obtemos o curso associado ao coordenador logado
//     const queryCurso = `
//       SELECT id_curso 
//       FROM cursos 
//       WHERE id_coordenador_curso = ?`;

//     db.query(queryCurso, [userId], (err, cursoResult) => {
//       if (err) {
//         console.error("Erro ao buscar o curso do coordenador:", err);
//         return res
//           .status(500)
//           .json({ message: "Erro ao buscar o curso do coordenador.", error: err });
//       }

//       if (cursoResult.length === 0) {
//         return res.status(404).json({ message: "Nenhum curso associado ao coordenador." });
//       }

//       // Obtém o ID do curso
//       const idCurso = cursoResult[0].id_curso;
//       console.log("ID do curso associado ao coordenador:", idCurso);

//       // Agora, buscamos os alunos associados ao mesmo curso
//       const queryAlunos = `
//         SELECT 
//             u.id_user,
//             u.nome,
//             t.tema,
//             o.nome AS nome_orientador,
//             t.status AS estado_tese,
//            DATE(t.data_submissao) AS data_defesa,
//             t.doc_tese AS documento_tese
//         FROM 
//             Users u
//         LEFT JOIN 
//             Tese t ON u.id_user = t.id_aluno
//         LEFT JOIN 
//             Users o ON t.id_orientador = o.id_user
//         WHERE 
//             u.id_tipo_utilizador = 2 AND u.id_curso = ?`;

//       db.query(queryAlunos, [idCurso], (err, alunosResult) => {
//         if (err) {
//           console.error("Erro ao buscar os dados dos alunos:", err);
//           return res
//             .status(500)
//             .json({ message: "Erro ao buscar os dados dos alunos.", error: err });
//         }

//         // Imprime os resultados no console
//         console.log("Resultados da query:", alunosResult);
//         return res.status(200).json(alunosResult);
//       });
//     });
//   } else {
//     return res.status(401).json({ message: "Usuário não autenticado." });
//   }
// };

exports.getInfoToCordenador = (req, res) => {
  if (req.session.userId) {
    const userId = req.session.userId; // Obtém o ID do usuário logado da sessão
    console.log("ID do usuário logado (coordenador):", userId);

    // Primeiro, obtemos o curso associado ao coordenador logado
    const queryCurso = `
      SELECT id_curso 
      FROM cursos 
      WHERE id_coordenador_curso = ?`;

    db.query(queryCurso, [userId], (err, cursoResult) => {
      if (err) {
        console.error("Erro ao buscar o curso do coordenador:", err);
        return res
          .status(500)
          .json({ message: "Erro ao buscar o curso do coordenador.", error: err });
      }

      if (cursoResult.length === 0) {
        return res.status(404).json({ message: "Nenhum curso associado ao coordenador." });
      }

      // Obtém o ID do curso
      const idCurso = cursoResult[0].id_curso;
      console.log("ID do curso associado ao coordenador:", idCurso);

      // Agora, buscamos os alunos associados ao mesmo curso
      const queryAlunos = `
        SELECT 
            u.id_user,
            u.nome,
            t.tema,
            o.nome AS nome_orientador,
            t.status AS estado_tese,
            t.data_submissao AS data_defesa,
            t.doc_tese AS documento_tese
        FROM 
            Users u
        LEFT JOIN 
            Tese t ON u.id_user = t.id_aluno
        LEFT JOIN 
            Users o ON t.id_orientador = o.id_user
        WHERE 
            u.id_tipo_utilizador = 2 AND u.id_curso = ?`;

      db.query(queryAlunos, [idCurso], (err, alunosResult) => {
        if (err) {
          console.error("Erro ao buscar os dados dos alunos:", err);
          return res
            .status(500)
            .json({ message: "Erro ao buscar os dados dos alunos.", error: err });
        }

        // Formatar as datas no formato 'YYYY-MM-DD' caso necessário
        alunosResult.forEach(aluno => {
          if (aluno.data_defesa) {
            aluno.data_defesa = aluno.data_defesa.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'
          }
        });

        // Imprime os resultados no console
        console.log("Resultados formatados da query:", alunosResult);
        return res.status(200).json(alunosResult);
      });
    });
  } else {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }
};


// // Controlador para obter o ID do curso associado ao coordenador logado
// exports.getCursoByCoordenador = (req, res) => {
//   if (req.session.userId) {
//     const userId = req.session.userId; // Obtém o ID do usuário logado da sessão

//     // Query para buscar o curso associado ao coordenador logado
//     const queryCurso = `SELECT id_curso FROM Users WHERE id_user = ?`;

//     db.query(queryCurso, [userId], (err, cursoResult) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "Erro ao buscar o curso do coordenador.", error: err });
//       }

//       if (cursoResult.length === 0) {
//         return res.status(404).json({ message: "Nenhum curso associado ao coordenador." });
//       }

//       // Retorna o ID do curso encontrado
//       const idCurso = cursoResult[0].id_curso;
//       console.log("ID do curso associado:", idCurso);

//       res.status(200).json({ id_curso: idCurso });
//     });
//   } else {
//     res.status(401).json({ message: "Usuário não autenticado." });
//   }
// };



// // Controlador para obter todos os utilizadores associados ao coordenador logado
// exports.getInfoToCordenador = (req, res) => {
//   if (req.session.userId) {

//     const userId = req.session.userId; // Obtém o ID do usuário logado da sessão
//     console.log("userId");
//     console.log(userId);

//     // Primeiro, obtemos o curso associado ao coordenador logado
//     const queryCurso = `SELECT id_curso FROM Users WHERE id_user = ?`;

//     db.query(queryCurso, [userId], (err, cursoResult) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "Erro ao buscar o curso do coordenador.", error: err });
//       }

//       if (cursoResult.length === 0) {
//         return res.status(404).json({ message: "Nenhum curso associado ao coordenador." });
//       }

//       const idCurso = getCursoByCoordenador();
//       console.log("idCurso");
//       console.log(idCurso);

//       // Agora, buscamos os usuários do curso associado
//       const query = `
//         SELECT 
//             u.id_user,
//             u.nome,
//             t.tema,
//             o.nome AS nome_orientador,
//             t.status AS estado_tese,
//             t.data_submissao AS data_defesa,
//             t.doc_tese AS documento_tese
//         FROM 
//             Users u
//         JOIN 
//             Tese t ON u.id_user = t.id_aluno
//         LEFT JOIN 
//             Users o ON t.id_orientador = o.id_user
//         WHERE 
//             u.id_tipo_utilizador = 2 AND u.id_curso = ?
//       `;

//       db.query(query, [idCurso], (err, results) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Erro ao buscar os dados dos utilizadores.", error: err });
//         }
//          // Imprime os resultados no console
//        console.log("Resultados da query:", results);
//         res.status(200).json(results);
//       });
//     });
//   } else {
//     res.status(401).json({ message: "Usuário não autenticado." });
//   }
// };
