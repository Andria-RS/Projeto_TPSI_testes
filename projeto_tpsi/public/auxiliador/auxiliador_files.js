// console.log("Script carregado corretamente!");


// function baixarTemplate() {
//     window.location.href = '/relatorios/download-template';
// }

// function fazerUpload() {
//     const fileInput = document.getElementById('fileInput');
//     const numDefesa = document.getElementById('numDefesa').value;

//     if (fileInput.files.length === 0) {
//         alert('Selecione um arquivo para enviar.');
//         return;
//     }
//     if (!numDefesa) {
//         alert('Preencha o Número de Defesa.');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', fileInput.files[0]);
//     formData.append('numDefesa', numDefesa);

//     fetch('/relatorios/upload-relatorio', {
//         method: 'POST',
//         body: formData,
//         credentials: 'include'  // Para enviar cookies/sessão
//     })
//     .then(response => response.json())
//     .then(data => alert(data.message))
//     .catch(error => console.error('Erro ao enviar:', error));
// }

window.baixarTemplate = function() {
    
    window.location.href = '/api/relatorios/download-template';
};
window.fazerUpload = function() {
    const fileInput = document.getElementById('fileInput');
    const numDefesa = document.getElementById('numDefesa').value;
    const userId = sessionStorage.getItem('userId'); // Recupera o userId
    console.log("userId");
    console.log(userId);
    if (fileInput.files.length === 0) {
        alert('Selecione um arquivo para enviar.');
        return;
    }
    if (!numDefesa) {
        alert('Preencha o Número de Defesa.');
        return;
    }
    

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('numDefesa', numDefesa);
    formData.append('userId', userId); // Adicionando userId ao FormData

    fetch('/api/relatorios/upload-relatorio', {
        method: 'POST',
        body: formData,
        
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Erro ao enviar:', error));
};
