

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitThesisForm").addEventListener("submit", submitThesis);
});

async function submitThesis(event) {
    console.log("ENTREI NA FUNÇÃO DE ENVIO DE TESE");
    event.preventDefault();

    // Obtém o ID do usuário do sessionStorage
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        alert("Usuário não autenticado. Faça login novamente.");
        return;
    }

    // Obtém os campos do formulário
    const formElement = document.getElementById("submitThesisForm");
    const formData = new FormData(formElement);

    // Cria o objeto JSON com os dados do formulário
    const data = {
        userId: userId,
        status: formData.get("status"), // Nome do campo no HTML: "status"
        title: formData.get("thesisTitle"), // Nome do campo no HTML: "thesisTitle"
    };

    // Certifica-se de que o arquivo da tese foi selecionado
    const thesisFileInput = document.getElementById("thesisFile");
    if (thesisFileInput?.files?.length > 0) {
        const file = thesisFileInput.files[0];
        const base64File = await fileToBase64(file); // Converte o arquivo para Base64
        data.thesisFile = base64File; // Adiciona o arquivo ao JSON
        data.fileName = file.name; // Inclui o nome do arquivo
    } else {
        alert("Por favor, selecione o arquivo da tese antes de enviar.");
        return;
    }

    console.log("Dados a serem enviados:", JSON.stringify(data));

    try {
        const response = await fetch("/api/submit-document", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            alert(responseData.message || "Documento enviado com sucesso!");
        } else {
            alert(responseData.message || "Erro ao enviar documento.");
        }
    } catch (error) {
        console.error("Erro ao enviar tese:", error);
        alert("Erro ao enviar tese: " + error.message);
    }
}

// Função para converter o arquivo para Base64
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // Remove o prefixo `data:...base64,`
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
