const express = require('express');
const PDFDocument = require('pdfkit');

const router = express.Router();

// Rota para gerar o PDF
router.post('/generate-pdf', (req, res) => {
  const { rows } = req.body; // Dados da tabela enviados pelo cliente

  const doc = new PDFDocument();

  // Configurar os cabeçalhos para o download
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_estudantes.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  // Enviar o PDF diretamente para o cliente
  doc.pipe(res);

  // Adicionar título ao PDF
  doc.fontSize(18).text('Relatório de Estudantes', { align: 'center' }).moveDown(2); // Espaço adicional

  // Adicionar os dados da tabela no PDF
  rows.forEach((row, index) => {
    doc
      .fontSize(12)
      .text(`Número: ${row.id_user}`) // Campo "Número" adicionado
      .text(`Nome: ${row.nome}`)
      .text(`Tema: ${row.tema}`)
      .text(`Orientador: ${row.nome_orientador}`)
      .text(`Estado da Tese: ${row.estado_tese}`)
      .text(`Data da Defesa: ${row.data_defesa}`)
      .moveDown(1); // Linha em branco entre os registros
  });

  // Finalizar o documento
  doc.end();
});

module.exports = router;
