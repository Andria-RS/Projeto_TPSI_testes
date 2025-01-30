
// let usuarios = []; // Declaração global da variável

// // Função para buscar os usuários do backend
// function getsUsers() {
//     console.log("Iniciando busca dos usuários...");
//     fetch("/api/getInfoToCordenador")
//         .then(response => response.json()) // Convertendo a resposta para JSON
//         .then(data => {
//             console.log("Dados recebidos:", data);
//             usuarios = data.data || data || []; // Atualiza a variável global com os dados recebidos
//             popularTabela(usuarios); // Renderiza a tabela com os dados
//         })
//         .catch(error => {
//             console.error("Erro ao buscar os dados dos utilizadores:", error);
//             alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
//         });
// }

// // Função para popular a tabela
// function popularTabela(usuariosParaMostrar) {
//     const tbody = document.getElementById("tabela_Search");

//     if (!tbody) {
//         console.error('Elemento com ID "tabela_Search" não encontrado no DOM.');
//         return;
//     }

//     tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela

//     usuariosParaMostrar.forEach(usuario => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${usuario.nome || "N/A"}</td>
//           <td>${usuario.tema || "Sem Tema"}</td>
//           <td>${usuario.nome_orientador || "Sem Orientador"}</td>
//           <td>${usuario.estado_tese || "Sem Estado"}</td>
//           <td>${usuario.data_defesa || "Sem Data"}</td>
//          <td>$${usuario.documento_tese ? `<a href="/src/${usuario.documento_tese}" download>Ver Documento</a>` : "Sem Documento"}</td>
//           <td>
//               <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})">Editar</button>
//               <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})">Excluir</button>
//           </td>
//         `;
//         tbody.appendChild(tr);
//     });

//     console.log("Tabela preenchida com os usuários:", usuariosParaMostrar);
// }

// // Função para inicializar
// document.addEventListener("DOMContentLoaded", () => {
//     getsUsers();
// });





let usuarios = []; // Declaração global da variável

// Função para buscar os usuários do backend
function getsUsers() {
    console.log("Iniciando busca dos usuários...");
    fetch("/api/getInfoToCordenador")
        .then(response => response.json()) // Convertendo a resposta para JSON
        .then(data => {
            console.log("Dados recebidos:", data);
            usuarios = data.data || data || []; // Atualiza a variável global com os dados recebidos
            popularTabela(usuarios); // Renderiza a tabela com os dados
        })
        .catch(error => {
            console.error("Erro ao buscar os dados dos utilizadores:", error);
            alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
        });
}

// Função para popular a tabela
function popularTabela(usuariosParaMostrar) {
    const tbody = document.getElementById("tabela_Search");

    if (!tbody) {
        console.error('Elemento com ID "tabela_Search" não encontrado no DOM.');
        return;
    }

    tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela

    usuariosParaMostrar.forEach(usuario => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${usuario.nome || "N/A"}</td>
          <td>${usuario.tema || "Sem Tema"}</td>
          <td>${usuario.nome_orientador || "Sem Orientador"}</td>
          <td>${usuario.estado_tese || "Sem Estado"}</td>
          <td>${usuario.data_defesa || "Sem Data"}</td>
          <td>
            ${usuario.documento_tese ? `<a href="/download/${usuario.documento_tese}" target="_blank">Abrir Documento</a>` : "Sem Documento"}
          </td>
          <td>
              <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})"><i class="fas fa-edit"></i>Editar</button>
              <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})"><i class="fas fa-trash-alt">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
    });

    console.log("Tabela preenchida com os usuários:", usuariosParaMostrar);
}

// Função para inicializar
document.addEventListener("DOMContentLoaded", () => {
    getsUsers();
});


// let usuarios = []; // Declaração global da variável

// // Função para buscar os usuários do backend
// function getsUsers() {
//     console.log("Iniciando busca dos usuários...");
//     fetch("/api/getInfoToCordenador")
//         .then(response => response.json()) // Convertendo a resposta para JSON
//         .then(data => {
//             console.log("Dados recebidos:", data);
//             usuarios = data.data || data || []; // Atualiza a variável global com os dados recebidos
//             popularTabela(usuarios); // Renderiza a tabela com os dados
//         })
//         .catch(error => {
//             console.error("Erro ao buscar os dados dos utilizadores:", error);
//             alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
//         });
// }

// // Função para popular a tabela
// function popularTabela(usuariosParaMostrar) {
//     const tbody = document.getElementById("tabela_Search");

//     if (!tbody) {
//         console.error('Elemento com ID "tabela_Search" não encontrado no DOM.');
//         return;
//     }

//     tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela

//     usuariosParaMostrar.forEach(usuario => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${usuario.nome || "N/A"}</td>
//           <td>${usuario.tema || "Sem Tema"}</td>
//           <td>${usuario.nome_orientador || "Sem Orientador"}</td>
//           <td>${usuario.estado_tese || "Sem Estado"}</td>
//           <td>${usuario.data_defesa || "Sem Data"}</td>
//           <td>
//     ${usuario.documento_tese ? `<a href="/download/${usuario.documento_tese}" download>Download Documento</a>` : "Sem Documento"}
// </td>

//           <td>
//               <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})">Editar</button>
//               <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})">Excluir</button>
//           </td>
//         `;
//         tbody.appendChild(tr);
//     });

//     console.log("Tabela preenchida com os usuários:", usuariosParaMostrar);
// }

// // Função para inicializar
// document.addEventListener("DOMContentLoaded", () => {
//     getsUsers();
// });



// let usuarios = []; // Declaração global da variável

// // Função para buscar os usuários do backend
// function getsUsers() {
//     console.log("Iniciando busca dos usuários...");
//     fetch("/api/getInfoToCordenador")
//         .then(response => response.json()) // Convertendo a resposta para JSON
//         .then(data => {
//             console.log("Dados recebidos:", data);
//             usuarios = data.data || []; // Atualiza a variável global com os dados recebidos (assumindo que vem em `data`)
//             popularTabela(usuarios); // Renderiza a tabela com os dados
//         })
//         .catch(error => {
//             console.error("Erro ao buscar os dados dos utilizadores:", error);
//             alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
//         });
// }

// // Função para popular a tabela
// function popularTabela(usuariosParaMostrar) {
//     const tbody = document.getElementById("tabela_Search");
//     tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela

//     usuariosParaMostrar.forEach(usuario => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${usuario.nome || "N/A"}</td>
//           <td>${usuario.tema || "Sem Tema"}</td>
//           <td>${usuario.nomeOrientador || "Sem Orientador"}</td>
//           <td>${usuario.estadoTese || "Sem Estado"}</td>
//           <td>${usuario.dataDefesa || "Sem Data"}</td>
//           <td>${usuario.documentoTese ? `<a href="${usuario.documentoTese}" target="_blank">Ver Documento</a>` : "Sem Documento"}</td>
//           <td>
//               <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.idUser})">Editar</button>
//               <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.idUser})">Excluir</button>
//           </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // Função para aplicar os filtros
// function aplicarFiltro() {
//     const nomeFiltro = document.getElementById("nome").value.toLowerCase();
//     const temaFiltro = document.getElementById("tema").value.toLowerCase();
//     const orientadorFiltro = document.getElementById("nome_orientador").value.toLowerCase();
//     const estadoFiltro = document.getElementById("estado_tese").value.toLowerCase();

//     const usuariosFiltrados = usuarios.filter(usuario => {
//         return (
//             (usuario.nome || "").toLowerCase().includes(nomeFiltro) &&
//             (usuario.tema || "").toLowerCase().includes(temaFiltro) &&
//             (usuario.nomeOrientador || "").toLowerCase().includes(orientadorFiltro) &&
//             (usuario.estadoTese || "").toLowerCase().includes(estadoFiltro)
//         );
//     });

//     popularTabela(usuariosFiltrados);
// }

// // Adicionar eventos e funções ao escopo global
// window.aplicarFiltro = aplicarFiltro;
// window.getsUsers = getsUsers;
// window.popularTabela = popularTabela;

// // Carregar dados ao inicializar
// document.addEventListener("DOMContentLoaded", getsUsers);