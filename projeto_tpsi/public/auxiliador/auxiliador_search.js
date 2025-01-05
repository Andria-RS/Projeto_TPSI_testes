
// let usuarios = [];

// function getsUsers() {
//     console.log("entrei no controller antes");
//     // Fazendo a requisição para o backend
//    fetch("/api/getAllUsersbyCordenador")
//       .then(response => response.json()) // Convertendo a resposta para JSON
//       .then(usuarios => {
//             console.log("busca dados")
            
//             console.log(usuarios)
//             // Uma vez que os dados são recebidos, renderizamos a tabela
//             popularTabela(usuarios);
            
//        })
//       .catch(error => {
//          console.error("Erro ao buscar os dados dos utilizadores:", error);
//        });

    
// }

// document.addEventListener("DOMContentLoaded", getsUsers); // Chama a função para buscar os dados ao carregar a página

// function popularTabela(usuarios) {
//     const tbody = document.getElementById("tabela_Search");
//     tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela
//        usuarios.forEach((usuario, index) => {
//        const tr = document.createElement("tr");
  
//           tr.innerHTML = `
//           <td>${usuario.nome}</td>
//           <td>${usuario.email}</td>
//           <td>${usuario.contacto}</td>
//           <td>${usuario.curriculo}</td>
//           <td>${usuario.especialidade}</td>
//           <td>${usuario.Tipo_utilizador}</td>
//           <td>${usuario.Polo}</td>
//           <td>
//               <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})">Editar</button>
//                <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})">Excluir</button>
//           </td>
//           `;
//         tbody.appendChild(tr);
//       });
//   }
//   window.onload = popularTabela;


// function aplicarFiltro() {
//     const nomeFiltro = document.getElementById("nome").value.toLowerCase();
//     const contactoFiltro = document.getElementById("contacto").value.toLowerCase();
//     const emailFiltro = document.getElementById("email").value.toLowerCase();
//     const tipoFiltro = document.getElementById("Tipo_utilizador").value.toLowerCase();
//     const especialidadeFiltro = document.getElementById("especialidade").value.toLowerCase();

//     const usuariosFiltrados = usuarios.filter(usuario => {
//         return (
//             usuario.nome.toLowerCase().includes(nomeFiltro) &&
//             usuario.contacto.toLowerCase().includes(contactoFiltro) &&
//             usuario.email.toLowerCase().includes(emailFiltro) &&
//             usuario.Tipo_utilizador.toLowerCase().includes(tipoFiltro) &&
//             usuario.especialidade.includes(especialidadeFiltro)
//         );
//     });

//     popularTabela(usuariosFiltrados);
// }

// // Adicione `aplicarFiltro` ao escopo global para o HTML acessá-lo
// window.aplicarFiltro = aplicarFiltro;
// // Torna as funções disponíveis globalmente para o HTML
// window.getsUsers = getsUsers;
// window.popularTabela = popularTabela;

let usuarios = []; // Declaração global da variável

function getsUsers() {
    console.log("entrei no controller antes");
    // Fazendo a requisição para o backend
    fetch("/api/getAllUsersbyCordenador")
        .then(response => response.json()) // Convertendo a resposta para JSON
        .then(data => {
            console.log("busca dados");
            console.log(data);
            usuarios = data; // Atualiza a variável global com os dados recebidos
            popularTabela(usuarios); // Renderiza a tabela com os dados
        })
        .catch(error => {
            console.error("Erro ao buscar os dados dos utilizadores:", error);
        });
}

document.addEventListener("DOMContentLoaded", getsUsers); // Chama a função para buscar os dados ao carregar a página

function popularTabela(usuariosParaMostrar) {
    const tbody = document.getElementById("tabela_Search");
    tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela
    usuariosParaMostrar.forEach((usuario, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${usuario.nome}</td>
          <td>${usuario.email}</td>
          <td>${usuario.contacto}</td>
          <td>${usuario.curriculo}</td>
          <td>${usuario.especialidade}</td>
          <td>${usuario.Tipo_utilizador}</td>
          <td>${usuario.Polo}</td>
          <td>
              <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})">Editar</button>
               <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})">Excluir</button>
          </td>
          `;
        tbody.appendChild(tr);
    });
}

function aplicarFiltro() {
    const nomeFiltro = document.getElementById("nome").value.toLowerCase();
    const contactoFiltro = document.getElementById("contacto").value.toLowerCase();
    const emailFiltro = document.getElementById("email").value.toLowerCase();
    const tipoFiltro = document.getElementById("Tipo_utilizador").value.toLowerCase();
    const especialidadeFiltro = document.getElementById("especialidade").value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario => {
        return (
            usuario.nome.toLowerCase().includes(nomeFiltro) &&
            usuario.contacto.toLowerCase().includes(contactoFiltro) &&
            usuario.email.toLowerCase().includes(emailFiltro) &&
            usuario.Tipo_utilizador.toLowerCase().includes(tipoFiltro) &&
            usuario.especialidade.toLowerCase().includes(especialidadeFiltro)
        );
    });

    popularTabela(usuariosFiltrados);
}

// Adicione `aplicarFiltro` ao escopo global para o HTML acessá-lo
window.aplicarFiltro = aplicarFiltro;
// Torna as funções disponíveis globalmente para o HTML
window.getsUsers = getsUsers;
window.popularTabela = popularTabela;
