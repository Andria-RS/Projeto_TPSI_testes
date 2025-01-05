
const db = require("../database");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");




exports.option_TipoUser  = (req, res) => {
    // A consulta busca os id_curso e designacao da tabela cursos
    db.query('SELECT id_tipo_utilizador, designacao FROM tipo_utilizador', (err, results) => {
        if (err) {
            // Se ocorrer um erro na consulta, retornamos um status 500 e a mensagem de erro
            console.error('Erro ao buscar cursos:', err);
            return res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
        // Caso contrário, retornamos os resultados da consulta como um JSON
        res.json(results);
    });
};



exports.option_Cursos = (req, res) => {
    // A consulta busca os id_curso e designacao da tabela cursos
    db.query('SELECT id_curso, designacao FROM cursos', (err, results) => {
        if (err) {
            // Se ocorrer um erro na consulta, retornamos um status 500 e a mensagem de erro
            console.error('Erro ao buscar cursos:', err);
            return res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
        // Caso contrário, retornamos os resultados da consulta como um JSON
        res.json(results);
    });
};


exports.option_Polo = (req, res) => {
    // A consulta busca os id_curso e designacao da tabela cursos
    db.query('SELECT id_polo, designacao FROM polo', (err, results) => {
        if (err) {
            // Se ocorrer um erro na consulta, retornamos um status 500 e a mensagem de erro
            console.error('Erro ao buscar cursos:', err);
            return res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
        // Caso contrário, retornamos os resultados da consulta como um JSON
        res.json(results);
    });
};
    

exports.getCoordenador = (req, res) => {
    // A consulta busca os id_curso e designacao da tabela cursos
    db.query(' SELECT id_user, nome FROM Users WHERE id_tipo_utilizador = 4', (err, results) => {
        if (err) {
            console.error('Erro ao buscar coordenadores:', err);
            return res.status(500).json({ error: 'Erro ao buscar coordenadores' });
        }
        res.json(results);
    });
};