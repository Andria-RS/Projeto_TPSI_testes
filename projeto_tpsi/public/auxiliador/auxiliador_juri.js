function adicionarJuri(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores do formulário manualmente
    const juryName = document.getElementById("juryName").value;
    const juryDefenseNumber = document.getElementById("juryDefenseNumber").value;

    // Cria um objeto JSON com os dados
    const formData = {
        juryName: juryName,
        juryDefenseNumber: juryDefenseNumber
    };

    // Envia os dados via fetch como JSON
    fetch("/api/add_juri", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Definição do cabeçalho para JSON
        },
        body: JSON.stringify(formData) // Converte o objeto em JSON
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        if (data.success) {
            alert("Juri adicionado com sucesso!");
        } else {
            alert("Erro ao adicionar juri: " + data.message);
        }

        // Fecha o modal após o envio
        $('#criarJuriModal').modal('hide');

        // Limpa os campos do formulário
        document.getElementById("form_Juri").reset();
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao enviar os dados");
    });
}
