
document.querySelectorAll('.form-submit').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o comportamento padrão de submit

        const formId = form.id;

        let to = '';
        let subject = '';
        let text = '';

        // Pega os valores do formulário com base no id do formulário
        if (formId === 'form_invite') {
            to = form.querySelector('#emailTo').value;
            subject = form.querySelector('#emailSubject').value;
            text = form.querySelector('#emailText').value;
        } else if (formId === 'form_request') {
            to = 'maria.j.b.conceicao1311@gmail.com'; // Destinatário fixo para o form_request
            subject = 'Solicitação de Reserva de Sala/Auditório'; // Assunto fixo
            text = form.querySelector('#emailText_request').value;
        }

        try {
            // Envia os dados para o servidor usando o método POST
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, text }),
            });

            // Mostra a mensagem de sucesso ou erro com base na resposta do servidor
            if (formId === 'form_invite') {
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
            } else if (formId === 'form_request') {
                const responseMessageRequest = document.getElementById('responseMessageRequest');
                if (response.ok) {
                    responseMessageRequest.style.display = 'block';
                    responseMessageRequest.className = 'alert alert-success';
                    responseMessageRequest.textContent = 'E-mail enviado com sucesso!';
                } else {
                    responseMessageRequest.style.display = 'block';
                    responseMessageRequest.className = 'alert alert-danger';
                    responseMessageRequest.textContent = 'Erro ao enviar o e-mail.';
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            // Exibe mensagem de erro caso o envio de e-mail ou a conexão falhe
            if (formId === 'form_invite') {
                const responseMessage = form.querySelector('.responseMessage');
                responseMessage.style.display = 'block';
                responseMessage.className = 'alert alert-danger';
                responseMessage.textContent = 'Erro ao conectar com o servidor.';
            } else if (formId === 'form_request') {
                const responseMessageRequest = form.querySelector('.responseMessageRequest');
                responseMessageRequest.style.display = 'block';
                responseMessageRequest.className = 'alert alert-danger';
                responseMessageRequest.textContent = 'Erro ao conectar com o servidor.';
            }
        }

        // Limpa os campos após o envio, mas não fecha a modal
        form.reset();
    });
});

// Função para limpar notificações
function clearNotifications() {
    const responseMessages = document.querySelectorAll('.responseMessage, .responseMessageRequest');
    
    responseMessages.forEach(message => {
        message.style.display = 'none';
        message.textContent = '';
        message.className = ''; // Remove classes para resetar estilos
    });
}

// Adicionar evento para limpar notificações ao fechar a modal
document.getElementById('modal_invite').addEventListener('hidden.bs.modal', clearNotifications);
 document.getElementById('modal_sala').addEventListener('hidden.bs.modal', clearNotifications);