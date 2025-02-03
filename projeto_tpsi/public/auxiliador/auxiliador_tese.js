function add_defesa(event) {
    event.preventDefault();  // Evita o envio padrão do formulário

    // Coleta os dados do formulário manualmente
    const idTese = document.getElementById('id_tese').value.trim();
    const dataDefesa = document.getElementById('data_defesa').value.trim();
    const localDefesa = document.getElementById('local_defesa').value.trim();

    // Depuração no console
    console.log("DEBUG - ID Tese:", idTese);
    console.log("DEBUG - Data Defesa:", dataDefesa);
    console.log("DEBUG - Local Defesa:", localDefesa);

    // Verificar se os dados obrigatórios estão preenchidos antes do envio
    if (!idTese || !dataDefesa || !localDefesa) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Criar objeto JSON para envio
    const formData = {
        id_tese: idTese,
        data_defesa: dataDefesa,
        local_defesa: localDefesa
    };

    // Depuração - Verificar se os dados estão corretos
    console.log("Enviando JSON:", JSON.stringify(formData));

    // Enviar os dados via fetch
    fetch('/api/add_defesa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Definir cabeçalho JSON
        },
        body: JSON.stringify(formData) // Enviar JSON como string
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.message.includes("Campos obrigatórios")) {
            alert("Erro: " + data.message);
        } else {
            $('#modal_add_defesa').modal('hide'); // Fechar modal se tudo estiver certo
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
