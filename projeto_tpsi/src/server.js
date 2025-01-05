const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const optionsRoutes = require("./routes/optionsRoutes");
const emailRoutes = require("./routes/emailRoutes.js")
const path = require("path");

const app = express();
// Aumenta o limite do payload
app.use(express.json({ limit: '10mb' })); // Ajuste o limite conforme necessário
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const PORT = 3000;

// Configuração do body-parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Configuração de sessões
app.use(
  session({
    secret: "secreta-chave",
    resave: false,
    saveUninitialized: false,
  })
);

// Usando rotas para autenticação e usuários
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", optionsRoutes);
app.use('/api', emailRoutes);

// Redireciona para a página de login quando acessar a rota "/"
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



app.get("/add_user", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aplicacao/add_user.html"));
});


// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});




/*const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const optionsRoutes = require("./routes/optionsRoutes");
const path = require("path");

const app = express();
const PORT = 3000;

// Configuração do body-parser para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Configuração de sessões
app.use(
  session({
    secret: "secreta-chave",
    resave: false,
    saveUninitialized: false,
  })
);

// Usando rotas para autenticação e usuários
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", optionsRoutes);

// Redireciona para a página de login quando acessar a rota "/"
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

// Rota para a página inicial após o login
app.get("/add_user", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/aplicacao/add_user.html"));
});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});




 */