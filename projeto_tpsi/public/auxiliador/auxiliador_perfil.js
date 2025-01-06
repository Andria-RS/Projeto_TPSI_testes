
function getUserId() {
    return sessionStorage.getItem('userId');
}

// Função para buscar e armazenar os dados do usuário em uma variável
function fetchUserData(userId) {
    return fetch(`/api/getUserPerfil/${userId}`)
        .then(response => response.json()) // Convertendo a resposta para JSON
        .then(userData => {
            console.log("Dados do usuário:", userData);
            // Retornar os dados do usuário
            return userData;
        })
        .catch(error => {
            console.error("Erro ao buscar os dados do usuário:", error);
            alert("Erro ao carregar os dados do usuário.");
        });
}

// Função para pegar os dados do usuário e exibir no HTML
function loadUserData(userId) {
    fetchUserData(userId)
        .then(user => {
            // Armazenando os dados do usuário em uma variável
            const userInfo = {
                nome: user.nome,
                email: user.email,
                especialidade: user.especialidade,
                curriculo: user.curriculo,
                foto: user.foto,  // Caminho da foto, que pode ser corrigido
                // Adicione outros campos que forem necessários
            };

            console.log("Usuário carregado:", userInfo);

            // Atualizando o HTML com os dados do usuário
            document.getElementById("user-name").innerText = userInfo.nome || "Nome não disponível";
            document.getElementById("user-email").innerText = userInfo.email || "Email não disponível";
            document.getElementById("user-especialidade").innerText = userInfo.especialidade || "Especialidade não disponível";
            document.getElementById("user-curriculo").innerText = userInfo.curriculo || "Currículo não disponível";

            // Atualizando a foto de perfil
            const profileImg = document.getElementById("user-photo");
            if (profileImg) {
                let caminhoFoto = userInfo.foto || "https://via.placeholder.com/120";  // Foto ou placeholder
                console.log("caminho:");
                console.log(caminhoFoto);

                // Corrigir o caminho da foto (substituindo barras invertidas por barras normais)
                caminhoFoto = caminhoFoto.replace(/\\/g, '/'); // Substitui as barras invertidas por barras normais
                
                // Adiciona a barra inicial para que o caminho seja relativo à raiz do servidor
                if (!caminhoFoto.startsWith('/')) {
                    caminhoFoto = '/' + caminhoFoto;
                }

                console.log("Caminho final com barra inicial:");
                console.log(caminhoFoto);
                profileImg.src = caminhoFoto;
                profileImg.alt = `Foto de ${userInfo.nome || "usuário"}`;
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do usuário:", error);
            alert("Erro ao carregar os dados do usuário.");
        });
}

// Função principal para carregar os dados do usuário
function initUserProfile() {
    const userId = getUserId();  // Recupera o ID do usuário do sessionStorage
    if (userId) {
        loadUserData(userId);  // Carrega e exibe os dados do usuário
    } else {
        alert("Usuário não encontrado!");  // Caso o ID não esteja no sessionStorage
    }
}

// Chamar a função para inicializar o perfil do usuário
initUserProfile();