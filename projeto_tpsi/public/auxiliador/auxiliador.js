// //LOADING FUNCTIONS
function openModal(modalId) {
  
  $('#' + modalId).modal('show');
}

  function closeModal(modalId) {
    
  $('#' + modalId).modal('dismiss');
 }

 function openSearchPage() {
  window.location.href = 'search.html'; // Redireciona para search.html
}


document.addEventListener('DOMContentLoaded', function() {
  // Requisição para obter os cursos
  fetch('/api/option_curso') // A URL do seu endpoint no backend
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      const selectCursos = document.querySelectorAll('.class_curso'); // Seleciona todos os elementos com a classe 'class_curso'

      selectCursos.forEach(selectCurso => {
        // Limpa as opções atuais do select
        selectCurso.innerHTML = '<option value="">Selecione o Curso</option>';
        
        // Preenche o select com as opções dos cursos
        data.forEach(curso => {
          const option = document.createElement('option');
          option.value = curso.id_curso;
          option.textContent = curso.designacao;
          selectCurso.appendChild(option);
        });
      });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Requisição para obter os tipos de utilizador
  fetch('/api/option_tipos-utilizado') // A URL do seu endpoint no backend
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      const selectTiposUtilizador = document.querySelectorAll('.class_tipo_utilizador'); // Seleciona todos os elementos com a classe 'class_tipo_utilizador'

      selectTiposUtilizador.forEach(selectTipoUtilizador => {
        // Limpa as opções atuais do select
        selectTipoUtilizador.innerHTML = '<option value="">Selecione o Tipo de Utilizador</option>';
        
        // Preenche o select com as opções dos tipos de utilizador
        data.forEach(tipo => {
          const option = document.createElement('option');
          option.value = tipo.id_tipo_utilizador; // Campo de ID do tipo de utilizador
          option.textContent = tipo.designacao; // Campo de designação (nome do tipo de utilizador)
          selectTipoUtilizador.appendChild(option);
        });
      });
    });
});

//polo
document.addEventListener('DOMContentLoaded', function() {
  // Requisição para obter os polos
  fetch('/api/option_Polo') // A URL do seu endpoint no backend
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      const selectPolos = document.querySelectorAll('.class_polo'); // Seleciona todos os elementos com a classe 'class_polo'
      const selectPolosAdd = document.querySelectorAll('.class_poloAdd'); // Seleciona todos os elementos com a classe 'class_poloAdd'

      // Preenche os select com a classe 'class_polo'
      selectPolos.forEach(selectPolo => {
        // Limpa as opções atuais do select
        selectPolo.innerHTML = '<option value="">Selecione o Polo</option>';

        data.forEach(polo => {
          const option = document.createElement('option');
          option.value = polo.id_polo; // Campo de ID do polo
          option.textContent = polo.designacao; // Campo de designação (nome do polo)
          selectPolo.appendChild(option);
        });
      });

      // Preenche os select com a classe 'class_poloAdd'
      selectPolosAdd.forEach(selectPoloAdd => {
        // Limpa as opções atuais do select
        selectPoloAdd.innerHTML = '<option value="">Selecione o Polo</option>';

        data.forEach(polo => {
          const option = document.createElement('option');
          option.value = polo.id_polo; // Campo de ID do polo
          option.textContent = polo.designacao; // Campo de designação (nome do polo)
          selectPoloAdd.appendChild(option);
        });
      });
    });
});
  
//coordenador

document.addEventListener('DOMContentLoaded', function() {
  // Requisição para obter os tipos de utilizador
  fetch('/api/option_coordenador') 
    .then(response => response.json())
    .then(data => {
      const selectTiposUtilizador = document.querySelectorAll('.class_coordenador');  // Altere a classe para 'class_coordenador'

      selectTiposUtilizador.forEach(selectTipoUtilizador => {
        selectTipoUtilizador.innerHTML = '<option value="">Selecione o Coordenador</option>';  // Alterado de 'Orientador' para 'Coordenador'
        
        // Preenche o select com as opções dos tipos de utilizador
        data.forEach(tipo => {
          const option = document.createElement('option');
          
          option.value = tipo.id_user; 
          option.textContent = tipo.nome; 
         
          selectTipoUtilizador.appendChild(option);
        });
      });
    });
});




//alunos
document.addEventListener('DOMContentLoaded', function() {
  
  fetch('/api/option_alunos') // A URL do seu endpoint no backend
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      const   selectAluno = document.querySelectorAll('.class_alunos'); // Seleciona todos os elementos com a classe 'class_tipo_utilizador'

      selectAluno.forEach(  selectAluno => {
        // Limpa as opções atuais do select
        selectAluno.innerHTML = '<option value="">Selecione o Estudante</option>';
        
        // Preenche o select com as opções dos tipos de utilizador
        data.forEach(tipo => {
          const option = document.createElement('option');
          option.value = tipo.id_user; 
          option.textContent = tipo.nome; 
          selectAluno.appendChild(option);
        });
      });
    });
});

//orientadores
document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/option_orientador') // A URL do seu endpoint no backend
  .then(response => response.json()) // Converte a resposta para JSON
  .then(data => {
    const   selectOrientador = document.querySelectorAll('.class_orientador'); // Seleciona todos os elementos com a classe 'class_tipo_utilizador'

    selectOrientador.forEach(  selectOrientador => {
      // Limpa as opções atuais do select
      selectOrientador.innerHTML = '<option value="">Selecione o Orientador</option>';
      
      // Preenche o select com as opções dos tipos de utilizador
      data.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id_user; 
        option.textContent = tipo.nome; 
        selectOrientador.appendChild(option);
      });
    });
  });
});

  
  function login(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.userId) {
        // Corrigido de 'essionStorage' para 'sessionStorage'
        sessionStorage.setItem('userId', data.userId);  // Armazenando no sessionStorage
        console.log(`Usuário logado com ID: ${data.userId}`);
        
        // Redireciona para a página principal
        window.location.href = "/aplicacao/index.html";  // Redireciona para index.html
      } else {
        alert(data.message);  // Exibe mensagem de erro, caso não consiga fazer login
      }
    })
    .catch(error => {
      alert("Erro ao realizar login: " + error.message);
    });
  }
  

  // REGISTER FUNCTION

  
  function register(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const contacto = document.getElementById("contacto").value;

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, password, contacto })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        if (data.message === "Usuário registrado com sucesso!") {
          window.location.href = "/aplicacao/login.html";  // Redireciona para login.html
        }
      }
    })
    .catch(error => {
      alert("Erro ao registrar: " + error.message);
    });
  }
      
      
  
//  // ADMIN FUNCTIONS

//       async function add_user(event) {
//         console.log("ENTREI NO ADD_USER");
//         event.preventDefault(); 
//         const formId = event.target.id;

       
//         const prefix = 
//             formId === "form_Aluno" ? "_Aluno" :
//             formId === "form_Admin" ? "_Admin" :
//             formId === "form_Coordenador" ? "_Coordenador" : 
//             formId === "form_Oriendador" ? "_Oriendador": "_Desconhecido";

      

//         const formElement = document.getElementById(formId);
       
//         // Cria um objeto FormData
//         const formData = new FormData();

//         // Adiciona os campos de texto ao FormData
//         formData.append("nome", document.getElementById(`nome${prefix}`)?.value || "");
//         formData.append("email", document.getElementById(`email${prefix}`)?.value || "");
//         formData.append("password", document.getElementById(`password${prefix}`)?.value || "");
//         formData.append("contacto", document.getElementById(`contacto${prefix}`)?.value || "");
//         formData.append("especialidade", document.getElementById(`esp${prefix}`)?.value || "");
//         formData.append("id_polo", formElement.querySelector('.class_polo')?.value || "");
       
//         if (formId === "form_Aluno") {
//           formData.append("curso", document.querySelector('.class_curso')?.value || "");
//           formData.append("id_tipo_utilizador", 2); // Tipo fixo para alunos
          
//         } else if (formId === "form_Admin") {
//           formData.append("id_tipo_utilizador", document.querySelector('.class_tipo_utilizador')?.value || "");
//           formData.append("curso", document.querySelector('.class_curso')?.value || "");
         
//         }else if (formId === "form_Coordenador") {
//           formData.append("id_tipo_utilizador", 4); 
          
//         }else if (formId === "form_Oriendador") {
//           formData.append("id_tipo_utilizador", 3); 
//         }

//         // Adiciona a foto ao FormData, se selecionada
//         const fotoInput = document.getElementById(`foto${prefix}`);
//         if (fotoInput?.files?.length > 0) {
//           formData.append("foto", fotoInput.files[0]); // Adiciona o arquivo diretamente
//         }

//         const pdfInput = document.getElementById(`curriculo${prefix}`); // Input para PDF
//         if (pdfInput?.files?.length > 0) {
//             formData.append("curriculo", pdfInput.files[0]); // Adiciona o arquivo PDF ao FormData
//          }

//         console.log("Dados a serem enviados:", formData);
//         console.log("Todos os dados no FormData:");
//         for (const [key, value] of formData.entries()) {
//           console.log(`${key}:`, value);
//         }

//         // Envia os dados para o servidor
//         fetch("/api/add_user", {
//           method: "POST",
//           body: formData, // Envia o FormData diretamente
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.message) {
//             alert(data.message);
            
//             if (data.message === "Usuário adicionado com sucesso!") {
//               window.location.href = "/aplicacao/index.html";
//               $('#modal_add_course').modal('hide'); 
//               location.reload(); 
//             }
//           }
//         })
//         .catch(error => {
//           console.error("Erro ao registrar:", error);
//           alert("Erro ao registrar: " + error.message);
//         });
//       }



 // ADMIN FUNCTIONS

 async function add_user(event) {
  console.log("ENTREI NO ADD_USER");
  event.preventDefault(); 
  const formId = event.target.id;

 
  const prefix = 
      formId === "form_Aluno" ? "_Aluno" :
      formId === "form_Admin" ? "_Admin" :
      formId === "form_Coordenador" ? "_Coordenador" : 
      formId === "form_Oriendador" ? "_Oriendador": "_Desconhecido";



  const formElement = document.getElementById(formId);
 
  // Cria um objeto FormData
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
  formData.append("nome", document.getElementById(`nome${prefix}`)?.value || "");
  formData.append("email", document.getElementById(`email${prefix}`)?.value || "");
  formData.append("password", document.getElementById(`password${prefix}`)?.value || "");
  formData.append("contacto", document.getElementById(`contacto${prefix}`)?.value || "");
  formData.append("especialidade", document.getElementById(`esp${prefix}`)?.value || "");
  formData.append("id_polo", formElement.querySelector('.class_polo')?.value || "");
 
  if (formId === "form_Aluno") {
    formData.append("curso", document.querySelector('.class_curso')?.value || "");
    formData.append("id_tipo_utilizador", 2); // Tipo fixo para alunos
    
  } else if (formId === "form_Admin") {
    formData.append("id_tipo_utilizador", document.querySelector('.class_tipo_utilizador')?.value || "");
    formData.append("curso", document.querySelector('.class_curso')?.value || "");
   
  }else if (formId === "form_Coordenador") {
    formData.append("id_tipo_utilizador", 4); 
    
  }else if (formId === "form_Oriendador") {
    formData.append("id_tipo_utilizador", 3); 
  }

  // Adiciona a foto ao FormData, se selecionada
  const fotoInput = document.getElementById(`foto${prefix}`);
  if (fotoInput?.files?.length > 0) {
    formData.append("foto", fotoInput.files[0]); // Adiciona o arquivo diretamente
  }

  const pdfInput = document.getElementById(`curriculo${prefix}`); // Input para PDF
  if (pdfInput?.files?.length > 0) {
      formData.append("curriculo", pdfInput.files[0]); // Adiciona o arquivo PDF ao FormData
   }

  console.log("Dados a serem enviados:", formData);
  console.log("Todos os dados no FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // Envia os dados para o servidor
  fetch("/api/add_user", {
    method: "POST",
    body: formData, // Envia o FormData diretamente
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
        alert(data.message);

        if (data.message === "Usuário adicionado com sucesso!") {
            // Obtém a modal aberta e fecha corretamente
            const modalElement = document.getElementById('registerModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }

            // Redirecionamento e recarregamento da página após um pequeno delay
            setTimeout(() => {
                window.location.href = "/aplicacao/index.html";
            }, 500); // Pequeno delay para garantir que a modal seja fechada antes do redirecionamento
        }
    }
})

  .catch(error => {
    console.error("Erro ao registrar:", error);
    alert("Erro ao registrar: " + error.message);
  });
}




      //--------------------------------------------------------
      function buscarUsuarios() {
        // Fazendo a requisição para o backend
        fetch("/api/getAllUsers")
          .then(response => response.json()) // Convertendo a resposta para JSON
          .then(usuarios => {
            console.log("busca dados")
            console.log(usuarios)
            // Uma vez que os dados são recebidos, renderizamos a tabela
            renderTabela(usuarios);
          })
          .catch(error => {
            console.error("Erro ao buscar os dados dos utilizadores:", error);
          });
      }

    //--------------------------------------------------------
    document.addEventListener("DOMContentLoaded", buscarUsuarios);

let usuarios = []; // Lista de usuários carregados
let paginaAtual = 1; // Página inicial
const usuariosPorPagina = 20; // Quantidade de usuários por página

// Função para buscar usuários da API (ou do banco de dados)
function buscarUsuarios() {
    fetch("/api/getAllUsers") 
        .then(response => response.json())
        .then(data => {
            usuarios = data; // Armazena os usuários na variável global
            renderTabela(); // Renderiza a primeira página da tabela
        })
        .catch(error => console.error("Erro ao buscar usuários:", error));
}

// Função para renderizar a tabela com base na página atual
function renderTabela() {
    const tbody = document.getElementById("tabela-usuarios");
    tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os dados

    // Cálculo do índice inicial e final para a página atual
    const inicio = (paginaAtual - 1) * usuariosPorPagina;
    const fim = inicio + usuariosPorPagina;
    const usuariosPagina = usuarios.slice(inicio, fim); // Obtém os usuários da página atual

    // Adiciona os usuários da página atual na tabela
    usuariosPagina.forEach((usuario) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.contacto}</td>
            <td>${usuario.Tipo_utilizador}</td>
            <td>${usuario.Polo}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editarUsuario(${usuario.id_user})"><i class="bi bi-pencil-square"></i>Editar</button>
                <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setUserIdToDelete(${usuario.id_user})"><i class="bi bi-trash3"></i>Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    atualizarPaginacao(); // Atualiza os botões de paginação
}

// Função para atualizar os botões de paginação
function atualizarPaginacao() {
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
    const paginacaoDiv = document.getElementById("paginacao");
    paginacaoDiv.innerHTML = `
        <button onclick="mudarPagina(-1)" class="btn btn-primary" ${paginaAtual === 1 ? "disabled" : ""}>Anterior</button>
        <span> Página ${paginaAtual} de ${totalPaginas} </span>
        <button onclick="mudarPagina(1)" class="btn btn-primary" ${paginaAtual === totalPaginas ? "disabled" : ""}>Próximo</button>
    `;
}

// Função para mudar de página
function mudarPagina(direcao) {
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
    if ((direcao === -1 && paginaAtual > 1) || (direcao === 1 && paginaAtual < totalPaginas)) {
        paginaAtual += direcao;
        renderTabela(); // Atualiza a tabela com a nova página
    }
}


    

//--------------------------------------------------------
    // let userIdToDelete = null;

    // function setUserIdToDelete(id) {
    //     userIdToDelete = id; // Armazena o ID do usuário para exclusão
    //     console.log("ID do usuário a ser excluído:", userIdToDelete);
    // }

    // function delete_user() {
    //   if (!userIdToDelete) {
    //     console.error('Nenhum usuário selecionado para exclusão.');
    //     return;
    //   }
    
    //   if (confirm(`Você tem certeza que deseja excluir o usuário com ID ${userIdToDelete}?`)) {
    //     fetch(`/api/delete_user/${userIdToDelete}`, {
    //         method: 'DELETE',
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             return response.json().then(err => {
    //                 console.error("Erro do servidor:", err);  
    //                 throw new Error(err.message || 'Erro desconhecido ao excluir o usuário');
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         alert('Usuário excluído com sucesso');
    //         buscarUsuarios(); // Atualiza a tabela de usuários após a exclusão
    //         const Modal = new bootstrap.Modal(document.getElementById('Modal'));
    //         Modal.hide();  

    //     })
    //     .catch(error => {
    //         console.error('Erro ao excluir usuário:', error);
    //         alert('Houve um problema ao excluir o usuário. Tente novamente mais tarde.');
    //     });
    //   }
    // }
    

    let userIdToDelete = null;

function setUserIdToDelete(id) {
    userIdToDelete = id;
    console.log("ID do usuário a ser excluído:", userIdToDelete);
}

function delete_user() {
    if (!userIdToDelete) {
        console.error("Nenhum usuário selecionado para exclusão.");
        alert("Erro: Nenhum usuário foi selecionado para exclusão.");
        return;
    }

    // if (!confirm(`Você tem certeza que deseja excluir o usuário com ID ${userIdToDelete}?`)) {
    //     return; 
    // }

    fetch(`/api/delete_user/${userIdToDelete}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error("Erro do servidor:", err);
                throw new Error(err.message || "Erro desconhecido ao excluir o usuário");
            });
        }
        return response.json();
    })
    .then(data => {
        alert("Usuário excluído com sucesso!");
        buscarUsuarios(); // Atualiza a tabela de usuários

        // Fecha a modal corretamente
        let modalElement = document.getElementById("deleteModal"); // Certifique-se do ID correto da modal
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        } else {
            console.warn("A modal não foi encontrada ou já está fechada.");
        }

        // Reseta o ID do usuário para evitar exclusões acidentais
        userIdToDelete = null;
    })
    .catch(error => {
        console.error("Erro ao excluir usuário:", error);
        alert("Houve um problema ao excluir o usuário. Tente novamente mais tarde.");
    });
}

    let userIdToEdit = null;
    let tipo_User;
    let data;

//--------------------------------------------------------

function editarUsuario(id) {
  userIdToEdit = id;
  fetch(`/api/getUserById/${userIdToEdit}`)
    .then(response => response.json())
    .then(usuario => {
      document.getElementById("editNome").value = usuario.nome;
      document.getElementById("editEmail").value = usuario.email;
      document.getElementById("editPassword").value = "";
      document.getElementById("editContacto").value = usuario.contacto;
      document.getElementById("editCurriculo").value = usuario.curriculo;
      document.getElementById("editEspecialidade").value = usuario.especialidade;

      tipo_User = usuario.Tipo_utilizador;
      data = usuario.data_registo;

      const poloSelect = document.getElementById("id_polo");
      console.log(usuario.Polo);
    
      poloSelect.value = usuario.Polo;
      const valorSelecionado = parseInt(poloSelect.value, 10);
      console.log(valorSelecionado);
    
      console.log( valorSelecionado);

      if (valorSelecionado !== usuario.Polo) {
        console.warn(`Polo ID ${usuario.Polo} não encontrado na lista de opções.`);
      }

      $("#editModal").modal("show");
    })
   
}
 //--------------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
  console.log("Script carregado! Aguardando ações...");
});

// Função para salvar as edições do usuário
function salvarEdicaoUsuario() {
  console.log("Iniciando salvarEdicaoUsuario...");

  // Pegando os elementos de forma segura
  const nomeInput = document.getElementById("editNome");
  const emailInput = document.getElementById("editEmail");
  const passwordInput = document.getElementById("editPassword");
  const passwordCInput = document.getElementById("editPasswordCofirmacions");
  const contactoInput = document.getElementById("editContacto");

  // Verificando se os elementos existem antes de acessar .value
  if (!nomeInput || !emailInput || !passwordInput || !passwordCInput || !contactoInput) {
      console.error("Algum campo do formulário não foi encontrado!");
      alert("Erro ao carregar o formulário. Atualize a página e tente novamente.");
      return;
  }

  // Pegando valores e removendo espaços extras
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordC = passwordCInput.value.trim();
  const contacto = contactoInput.value.trim();

  // Validação das senhas
  if (password !== passwordC) {
      alert("Confirme as Passwords corretamente.");
      return;
  }

  // Validação de campos obrigatórios
  if (!nome || !email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
  }

  // Criando objeto para envio
  const payload = {
      id_user: userIdToEdit,
      nome,
      email,
      password,
      contacto
  };

  console.log("Enviando dados para atualização...", payload);

  // Fazendo a requisição
  fetch(`/api/edit_user`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Erro na atualização: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      alert(data.message || "Usuário atualizado com sucesso!");

      // Fecha a modal corretamente usando Bootstrap 5
      let modalElement = document.getElementById("editModal");
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
          modalInstance.hide();
      } else {
          console.warn("A modal não foi encontrada!");
      }

      // Atualiza a tabela de usuários
      buscarUsuarios();
  })
  .catch(error => {
      console.error("Erro ao salvar as alterações do usuário:", error);
      alert("Erro ao salvar as alterações do usuário.");
  });
}

//--------------------------------------------------------

//Users Function
async function add_course(event) {
  console.log("ENTREI NO ADD_COURSE");
  event.preventDefault(); // Impede o comportamento padrão do envio do formulário

  // Cria um objeto FormData
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
  formData.append("nome_mestrado", document.getElementById("nome_mestrado")?.value || "");
  formData.append("nome_orientador", document.getElementById("id_Orientador")?.value || "");
  formData.append("id_polo", document.getElementById("id_polo_Curso")?.value || "");
 // console.log();
  console.log("Dados a serem enviados:", Object.fromEntries(formData.entries()));

  // Envia os dados para o servidor
  fetch("/api/add_course", {
    method: "POST",
    body: formData, // Envia o FormData diretamente
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message); // Exibe a mensagem de resposta do servidor
        if (data.success) {
          // Fecha o modal e atualiza a página se o curso foi adicionado com sucesso
          $('#modal_add_course').modal('hide'); // Fecha o modal
          location.reload(); // Recarrega a página para atualizar a lista de cursos
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao adicionar curso:", error);
      alert("Erro ao adicionar curso: " + error.message);
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("form_Tese"); // Captura o formulário com ID 'form_Tese'

  if (!formElement) {
    console.error("Formulário com ID 'form_Tese' não encontrado.");
    return; // Interrompe o processo caso o formulário não seja encontrado
  }

  // Função para adicionar a tese
  async function add_tese(event) {
    console.log("ENTREI NO ADD_TESE");
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura dos valores dos campos do formulário
    const tema = formElement.querySelector("#tema")?.value || "";
    const descricao = formElement.querySelector("#descricao")?.value || "";
    const status = formElement.querySelector("#status")?.value || "";
    const dataSubmissao = formElement.querySelector("#data_submissao")?.value || "";
    const idAluno = formElement.querySelector(".class_alunos")?.value || "";
    const idOrientador = formElement.querySelector(".class_orientador")?.value || "";
    const idCoordenador = formElement.querySelector(".class_coordenador")?.value || "00";

    console.log("Valores capturados do formulário:");
    console.log(`Tema: ${tema}`);
    console.log(`Descrição: ${descricao}`);
    console.log(`Status: ${status}`);
    console.log(`Data de Submissão: ${dataSubmissao}`);
    console.log(`Aluno ID: ${idAluno}`);
    console.log(`Orientador ID: ${idOrientador}`);
    console.log(`Coordenador ID: ${idCoordenador}`);

    // Cria um objeto para os dados
    const jsonData = {
      tema,
      descricao,
      status,
      data_submissao: dataSubmissao,
      id_aluno: idAluno,
      id_orientador: idOrientador,
      id_coordenador: idCoordenador
    };

    console.log("Dados a serem enviados (JSON):", jsonData);

    // Envia os dados para o servidor como JSON
    try {
      const response = await fetch("/api/add_tese", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData) // Converte o objeto em uma string JSON
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);

        if (data.message === "Tese adicionada com sucesso!") {
          // Atualiza a página após o sucesso
          window.location.href = "/aplicacao/index.html";
          $('#modal_add_tese').modal('hide');
          location.reload();
        }
      }
    } catch (error) {
      console.error("Erro ao registrar tese:", error);
      alert("Erro ao registrar tese: " + error.message);
    }
  }

  // Adiciona o evento de submissão ao formulário
  formElement.addEventListener("submit", add_tese);
});
