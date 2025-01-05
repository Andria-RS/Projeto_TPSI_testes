const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'maria.j.b.conceicao1311@gmail.com', 
        pass: 'hwjs pgqv cnai parm'           
    }
});

// Função para enviar o e-mail
const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        // Configuração do e-mail
        const mailOptions = {
            from: 'maria.j.b.conceicao1311@gmail.com', 
            to,                         
            subject,                    
            text                        
        };

        // Envia o e-mail
        await transporter.sendMail(mailOptions);
        res.status(200).send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('Erro ao enviar e-mail.');
    }
};

module.exports = { sendEmail };
