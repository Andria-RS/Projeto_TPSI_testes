
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "moona2034",
//   database: "mastertheses",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Erro ao conectar ao MySQL:", err);
//   } else {
//     console.log("Conectado ao banco de dados MySQL!");
//   }
// });

// module.exports = db;



const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Maria1297",
  database: "mastertheses",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

module.exports = db;
