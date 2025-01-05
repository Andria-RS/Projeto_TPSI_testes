document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Captura os valores dos inputs
    const to = document.getElementById('emailTo').value;
    const subject = document.getElementById('emailSubject').value; 
    
    const text = document.getElementById('emailText').value;

    // Configuração da requisição para a API
    try {
        const response = await fetch('http://localhost:3000/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, text }),
        });

        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.style.display = 'block';
            responseMessage.className = 'alert alert-success';
            responseMessage.textContent = 'E-mail enviado com sucesso!';
        } else {
            responseMessage.style.display = 'block';
            responseMessage.className = 'alert alert-danger';
            responseMessage.textContent = 'Erro ao enviar o e-mail.';
        }
    } catch (error) {
        console.error('Erro:', error);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.className = 'alert alert-danger';
        responseMessage.textContent = 'Erro ao conectar com o servidor.';
    }
});