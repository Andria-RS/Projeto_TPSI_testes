
// const express = require("express");
// const session = require("express-session");
// const path = require("path");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const optionsRoutes = require("./routes/optionsRoutes");
// const emailRoutes = require("./routes/emailRoutes.js");
// const pdfRoutes = require("./routes/pdfRoutes.js");
// const subRoutes = require("./routes/subRoutes.js");  // Certifique-se de que este arquivo existe
// const app = express();

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Aumenta o limite do payload
// app.use(express.json({ limit: '10mb' })); // Ajuste o limite conforme necessário
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// const PORT = 3000;

// // Serve arquivos estáticos da pasta "public"
// app.use(express.static(path.join(__dirname, "../public")));

// // Configuração de sessões
// app.use(
//   session({
//     secret: "secreta-chave",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Usando rotas para autenticação e usuários
// app.use("/api", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api", optionsRoutes);
// app.use('/api', emailRoutes);
// app.use('/api', pdfRoutes);
// app.use('/api', subRoutes); 
// app.get("/", (req, res) => {
//   res.redirect("/login");
// });

// // Rota para a página de login
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/aplicacao/login.html"));
// });

// // Rota para a página de registro
// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/aplicacao/register.html"));
// });

// // Rota para a página de adicionar usuário
// app.get("/add_user", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/aplicacao/add_user.html"));
// });

// // Inicia o servidor na porta 3000
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

const express = require("express");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const optionsRoutes = require("./routes/optionsRoutes");
const emailRoutes = require("./routes/emailRoutes.js");
const pdfRoutes = require("./routes/pdfRoutes.js");
const subRoutes = require("./routes/subRoutes.js"); // Certifique-se de que este arquivo existe

const app = express();

// Define a pasta 'uploads' como estática (acessível via URL)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares para processar JSON e dados URL-encoded
app.use(express.json({ limit: '10mb' })); // Limite de tamanho para JSON
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Limite de tamanho para dados do formulário

// Configuração de sessão
app.use(
  session({
    secret: "secreta-chave",
    resave: false,
    saveUninitialized: false,
  })
);

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Usando as rotas para autenticação, usuários, opções e outras
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", optionsRoutes);
app.use("/api", emailRoutes);
app.use("/api", pdfRoutes);
app.use("/api", subRoutes);

// Rota para a página inicial, redirecionando para o login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Rota para a página de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aplicacao/login.html"));
});


// Rota para a página de registro
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aplicacao/register.html"));
});

// Rota para a página de adicionar usuário
app.get("/add_user", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aplicacao/add_user.html"));
});

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
