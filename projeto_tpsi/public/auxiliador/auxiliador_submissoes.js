

// async function submissaoTese() {
//     console.log("ENTREI NA FUNÇÃO submissaoTese");

//     const thesisFileInput = document.getElementById("thesisFile");
//     if (!thesisFileInput || thesisFileInput.files.length === 0) {
//         alert("Por favor, selecione um arquivo PDF.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("tese", thesisFileInput.files[0]); // Nome do campo deve corresponder ao usado no backend

//     // Adicionando o userId ao FormData, já que você agora usa o userId no backend
//     const userId = sessionStorage.getItem("userId");
//     formData.append("userId", userId);

//     console.log("Enviando tese:", formData.get("tese"));

//     // Faz a requisição para enviar a tese ao backend
//     fetch("/api/upload_tese", {
//         method: "PUT",
//         body: formData,  // Aqui, você envia o formData contendo o arquivo e o userId
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message) {
//             alert("Tese enviada com sucesso!");
//             location.reload();
//         } else {
//             alert("Erro ao enviar tese: " + data.error);
//         }
//     })
//     .catch(error => {
//         console.error("Erro ao enviar tese:", error);
//         alert("Erro ao enviar tese: " + error.message);
//     });
// }



// // async function submissaoTese() {
// //     console.log("ENTREI NA FUNÇÃO submissaoTese");

// //     const thesisFileInput = document.getElementById("thesisFile");
// //     if (!thesisFileInput || thesisFileInput.files.length === 0) {
// //         alert("Por favor, selecione um arquivo PDF.");
// //         return;
// //     }

// //     // Obtém o userId do sessionStorage
// //     const userId = sessionStorage.getItem("userId");
// //     if (!userId) {
// //         alert("Usuário não autenticado.");
// //         return;
// //     }

// //     const thesisFile = thesisFileInput.files[0];

// //     // Lê o arquivo como base64
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //         const fileBase64 = reader.result.split(',')[1];  // Remove o prefixo data URL

// //         const data = {
// //             userId: userId,
// //             thesisFile: fileBase64, // Envia o arquivo como base64
// //             fileName: thesisFile.name
// //         };

// //         console.log("Enviando tese:", data);

// //         // Faz a requisição para enviar a tese ao backend
// //         fetch("/api/upload_tese", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify(data),
// //         })
// //         .then(response => response.json())
// //         .then(data => {
// //             if (data.message) {
// //                 alert("Tese enviada com sucesso!");
// //                 location.reload();
// //             } else {
// //                 alert("Erro ao enviar tese: " + data.error);
// //             }
// //         })
// //         .catch(error => {
// //             console.error("Erro ao enviar tese:", error);
// //             alert("Erro ao enviar tese: " + error.message);
// //         });
// //     };

// //     reader.readAsDataURL(thesisFile); // Converte o arquivo para base64
// // }~

async function submissaoTese() {
    console.log("ENTREI NA FUNÇÃO submissaoTese");

    const thesisFileInput = document.getElementById("thesisFile");
    if (!thesisFileInput || thesisFileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo PDF.");
        return;
    }

    const formData = new FormData();
    formData.append("tese", thesisFileInput.files[0]); // Nome do campo para o arquivo

    // Adicionando o userId ao FormData
    const userId = sessionStorage.getItem("userId");
    formData.append("userId", userId);  // Isso garante que o userId seja enviado

    console.log("Enviando tese:", formData.get("tese"));

    // Faz a requisição para enviar a tese ao backend
    fetch("/api/upload_tese", {
        method: "PUT",  // Usando POST, pois estamos enviando arquivos
        body: formData,  // Envia FormData com o arquivo e userId
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert("Tese enviada com sucesso!");
            location.reload();
        } else {
            alert("Erro ao enviar tese: " + data.error);
        }
    })
    .catch(error => {
        console.error("Erro ao enviar tese:", error);
        alert("Erro ao enviar tese: " + error.message);
    });
}

